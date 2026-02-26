#!/usr/bin/env node

// This verifies that all package.json files have a name property
// that matches the directory they are in.
// To run this, enter `node check-package-names.js`.

import { readdir, readFile } from "fs/promises";
import { join } from "path";

async function checkPackageJsonNames() {
  const errors = [];
  const cwd = process.cwd();

  try {
    // Get top-level directories
    const topLevelEntries = await readdir(cwd, { withFileTypes: true });
    const topLevelDirs = topLevelEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    // Check top-level directories
    for (const dir of topLevelDirs) {
      const dirPath = join(cwd, dir);
      await checkDirectory(dirPath, dir, errors);

      // Check one level deeper
      try {
        const secondLevelEntries = await readdir(dirPath, {
          withFileTypes: true,
        });
        const secondLevelDirs = secondLevelEntries
          .filter((entry) => entry.isDirectory())
          .map((entry) => entry.name);

        for (const subDir of secondLevelDirs) {
          const subDirPath = join(dirPath, subDir);
          await checkDirectory(subDirPath, subDir, errors);
        }
      } catch (err) {
        // Skip if can't read directory (permissions, etc.)
      }
    }

    // Report results
    if (errors.length === 0) {
      console.log("✓ All package.json names match their directory names!");
    } else {
      console.error("✗ Found mismatches:\n");
      errors.forEach((error) => {
        console.error(`  ${error.path}`);
        console.error(`    Directory name: "${error.dirName}"`);
        console.error(`    Package name:   "${error.packageName}"\n`);
      });
      process.exit(1);
    }
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

async function checkDirectory(dirPath, dirName, errors) {
  const packageJsonPath = join(dirPath, "package.json");

  try {
    const content = await readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(content);

    if (packageJson.name !== dirName) {
      errors.push({
        path: packageJsonPath,
        dirName,
        packageName: packageJson.name,
      });
    }
  } catch (err) {
    // No package.json or invalid JSON - skip silently
  }
}

checkPackageJsonNames();
