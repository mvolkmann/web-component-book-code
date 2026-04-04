#!/usr/bin/env node
// This updates the wrec version in all package.json files
// in subdirectories and reinstalls their dependencies.
// To run this, enter `node update-wrec-version.js <version>`.

import { readdir, readFile, rm, writeFile } from "fs/promises";
import { join, relative } from "path";
import { spawn } from "child_process";

const version = process.argv[2];

if (!version) {
  console.error("Usage: node update-wrec-version.js <version>");
  process.exit(1);
}

const dependencySections = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

function hasWrecDependency(packageJson) {
  return dependencySections.some((section) => packageJson[section]?.wrec);
}

async function findPackageJsonFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const packageJsonFiles = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) {
      continue;
    }

    const entryPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      packageJsonFiles.push(...(await findPackageJsonFiles(entryPath)));
      continue;
    }

    if (entry.isFile() && entry.name === "package.json") {
      packageJsonFiles.push(entryPath);
    }
  }

  return packageJsonFiles;
}

function updateWrecVersion(packageJson, nextVersion) {
  let changed = false;

  for (const section of dependencySections) {
    if (
      packageJson[section]?.wrec &&
      packageJson[section].wrec !== nextVersion
    ) {
      packageJson[section].wrec = nextVersion;
      changed = true;
    }
  }

  return changed;
}

async function reinstallDependencies(packageDir) {
  const packageLockPath = join(packageDir, "package-lock.json");
  const nodeModulesPath = join(packageDir, "node_modules");

  await rm(packageLockPath, { force: true });
  await rm(nodeModulesPath, { force: true, recursive: true });

  await new Promise((resolve, reject) => {
    const child = spawn("npm", ["install"], {
      cwd: packageDir,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`npm install failed with exit code ${code}`));
    });
  });
}

async function main() {
  const cwd = process.cwd();
  const packageJsonFiles = await findPackageJsonFiles(cwd);
  let matchedCount = 0;
  let updatedCount = 0;

  for (const packageJsonPath of packageJsonFiles) {
    const packageDir = join(packageJsonPath, "..");
    const content = await readFile(packageJsonPath, "utf8");
    const packageJson = JSON.parse(content);

    if (!hasWrecDependency(packageJson)) {
      continue;
    }

    matchedCount += 1;

    if (!updateWrecVersion(packageJson, version)) {
      continue;
    }

    await writeFile(
      packageJsonPath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
      "utf8",
    );

    const relativePackageDir = relative(cwd, packageDir) || ".";
    console.log(relativePackageDir);
    await reinstallDependencies(packageDir);
    updatedCount += 1;
  }

  if (matchedCount === 0) {
    console.log('No package.json files found with a dependency on "wrec".');
    return;
  }

  if (updatedCount === 0) {
    console.log(
      `All ${matchedCount} package(s) are already using wrec ${version}.`,
    );
    return;
  }

  console.log(`Finished updating ${updatedCount} package(s).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
