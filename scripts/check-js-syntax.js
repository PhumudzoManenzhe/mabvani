const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const ignoredParts = new Set(["node_modules", ".git", "coverage", ".vercel"]);

const collectJavaScriptFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    if (ignoredParts.has(entry.name)) {
      return [];
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectJavaScriptFiles(fullPath);
    }

    return entry.isFile() && entry.name.endsWith(".js") ? [fullPath] : [];
  });
};

const files = collectJavaScriptFiles(root);
let failed = false;

files.forEach((file) => {
  const result = spawnSync(process.execPath, ["--check", file], {
    cwd: root,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    failed = true;
    process.stderr.write(result.stderr || result.stdout);
  }
});

if (failed) {
  process.exit(1);
}

console.log(`Checked JavaScript syntax for ${files.length} files.`);
