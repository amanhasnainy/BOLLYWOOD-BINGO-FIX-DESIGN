import express from 'express';
import type { Express } from 'express';
import fs from "node:fs";
import path from "node:path";

function resolvePublicDir(): string {
  const candidates = [
    path.resolve(__dirname, "public"),
    path.resolve(process.cwd(), "dist", "public"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, "index.html"))) {
      return candidate;
    }
  }

  throw new Error(
    `Could not find client build (dist/public/index.html). Run "npm run build" first. Checked: ${candidates.join(", ")}`,
  );
}

export function serveStatic(app: Express) {
  const distPath = resolvePublicDir();

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
