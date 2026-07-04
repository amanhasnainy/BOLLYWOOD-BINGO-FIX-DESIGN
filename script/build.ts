import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { access, readdir, rm, readFile } from "node:fs/promises";
import path from "node:path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  await verifyBuildOutput();
}

async function verifyBuildOutput() {
  const required = [
    "dist/index.cjs",
    "dist/public/index.html",
  ];

  for (const file of required) {
    await access(file);
  }

  const assetDir = path.join("dist", "public", "assets");
  const assets = await readdir(assetDir);
  const jsBundle = assets.find((file) => file.endsWith(".js"));
  const cssBundle = assets.find((file) => file.endsWith(".css"));

  if (!jsBundle || !cssBundle) {
    throw new Error(
      `Client build is incomplete. Expected JS and CSS bundles in ${assetDir}, found: ${assets.join(", ") || "nothing"}`,
    );
  }

  console.log("build verified:");
  console.log(`  server  -> dist/index.cjs`);
  console.log(`  client  -> dist/public/index.html`);
  console.log(`  assets  -> dist/public/assets/${jsBundle}, dist/public/assets/${cssBundle}`);
  console.log(`  deploy  -> Web Service, start: npm start (do NOT set publish directory to dist)`);
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
