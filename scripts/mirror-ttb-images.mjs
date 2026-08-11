/**
 * Download all TTB images referenced in src/ to assets/photos/
 * Run: node scripts/mirror-ttb-images.mjs
 */
import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  statSync,
  readdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "assets", "photos");
const MANIFEST_PATH = join(ROOT, "src", "data", "local-image-manifest.json");

const CONCURRENCY = 12;
const TTB_ORIGIN = "https://www.tanzaniatourism.com";

function uploadUrlFromAny(url) {
  const clean = url.replace(/[,;)]+$/, "").split("?")[0];
  if (clean.includes("/images/uploads/")) return clean;
  const m = clean.match(/\/images\/made\/images\/uploads\/([^_]+)_\d+_\d+shar/i);
  if (m) return `${TTB_ORIGIN}/images/uploads/${m[1]}.jpg`;
  return null;
}

function localPathFromUpload(uploadUrl) {
  const m = uploadUrl.match(/\/images\/uploads\/(.+)$/i);
  if (!m) return null;
  return `/assets/photos/${m[1]}`;
}

function collectUrls() {
  const uploadUrls = new Set();

  function scan(dir) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      const st = statSync(p);
      if (st.isDirectory()) scan(p);
      else if (/\.(js|mjs|html|json)$/.test(name)) {
        if (name === "local-image-manifest.json") continue;
        const text = readFileSync(p, "utf8");
        for (const m of text.matchAll(/https?:\/\/www\.tanzaniatourism\.com[^\s"'<>\\)]+/g)) {
          const upload = uploadUrlFromAny(m[0]);
          if (upload) uploadUrls.add(upload);
        }
      }
    }
  }

  scan(join(ROOT, "src"));
  return [...uploadUrls];
}

async function downloadOne(uploadUrl) {
  const localPath = localPathFromUpload(uploadUrl);
  if (!localPath) return { uploadUrl, ok: false, reason: "bad-url" };

  const filename = localPath.replace("/assets/photos/", "");
  const outPath = join(OUT_DIR, filename);
  mkdirSync(dirname(outPath), { recursive: true });

  if (existsSync(outPath) && statSync(outPath).size > 1024) {
    return { uploadUrl, localPath, ok: true, skipped: true };
  }

  try {
    const res = await fetch(uploadUrl, {
      headers: { "User-Agent": "MatemboSafaris-Mirror/1.0" },
      redirect: "follow",
    });
    if (!res.ok) {
      return { uploadUrl, ok: false, reason: `HTTP ${res.status}` };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 512) {
      return { uploadUrl, ok: false, reason: "too-small" };
    }
    writeFileSync(outPath, buf);
    return { uploadUrl, localPath, ok: true, bytes: buf.length };
  } catch (err) {
    return { uploadUrl, ok: false, reason: err.message };
  }
}

async function runPool(items, worker) {
  const results = [];
  let index = 0;

  async function next() {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i], i);
      if (i % 50 === 0 || i === items.length - 1) {
        const done = results.filter(Boolean).length;
        const ok = results.filter((r) => r?.ok).length;
        process.stdout.write(`\r  Progress: ${done}/${items.length} (${ok} ok)`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, next));
  process.stdout.write("\n");
  return results;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const uploadUrls = collectUrls();
  console.log(`Found ${uploadUrls.length} unique TTB upload images to mirror.`);

  const results = await runPool(uploadUrls, downloadOne);

  const manifest = {};
  const failed = [];

  for (const r of results) {
    if (r?.ok && r.localPath) {
      manifest[r.uploadUrl] = r.localPath;
      // Also map made-url variants
      const base = r.uploadUrl.match(/\/images\/uploads\/([^/?#]+)$/i)?.[1];
      if (base) {
        manifest[`${TTB_ORIGIN}/images/made/images/uploads/${base.replace(/\.(jpg|jpeg|png|webp)$/i, "")}_750_550shar-50brig-20_c1.jpg`] =
          r.localPath;
        manifest[`${TTB_ORIGIN}/images/made/images/uploads/${base.replace(/\.(jpg|jpeg|png|webp)$/i, "")}_286_300shar-50brig-20_c1.jpg`] =
          r.localPath;
        manifest[`${TTB_ORIGIN}/images/made/images/uploads/${base.replace(/\.(jpg|jpeg|png|webp)$/i, "")}_1600_900shar-50brig-20_c1.jpg`] =
          r.localPath;
      }
    } else if (!r?.skipped) {
      failed.push(r);
    }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  const ok = results.filter((r) => r?.ok).length;
  const skipped = results.filter((r) => r?.skipped).length;
  const fail = failed.length;

  console.log(`Done: ${ok} downloaded (${skipped} skipped), ${fail} failed.`);
  console.log(`Manifest: ${MANIFEST_PATH}`);

  if (fail > 0) {
    console.log("First 10 failures:");
    failed.slice(0, 10).forEach((f) => console.log(`  ${f.reason}: ${f.uploadUrl}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
