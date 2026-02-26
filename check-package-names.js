#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
let hasErrors = false;

function checkDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) {
      continue; // skip node_modules and hidden dirs
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      checkDirectory(fullPath);
    } else if (entry.isFile() && entry.name === "package.json") {
      validatePackageJson(fullPath);
    }
  }
}

function validatePackageJson(packagePath) {
  const dirName = path.basename(path.dirname(packagePath));

  try {
    const content = fs.readFileSync(packagePath, "utf8");
    const pkg = JSON.parse(content);

    if (!pkg.name) {
      console.error(`❌ Missing "name" in ${packagePath}`);
      hasErrors = true;
      return;
    }

    if (pkg.name !== dirName) {
      console.error(
        `❌ Name mismatch in ${packagePath}\n` +
          `   Directory: ${dirName}\n` +
          `   package.json name: ${pkg.name}\n`,
      );
      hasErrors = true;
    } else {
      console.log(`✅ OK: ${packagePath}`);
    }
  } catch (err) {
    console.error(`❌ Error reading/parsing ${packagePath}: ${err.message}`);
    hasErrors = true;
  }
}

checkDirectory(rootDir);

if (hasErrors) {
  process.exit(1);
} else {
  console.log("\nAll package names match their directory names.");
}
