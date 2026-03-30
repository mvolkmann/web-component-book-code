#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)

for dir in "$script_dir"/*/; do
  [ -d "$dir" ] || continue
  echo
  echo "running nri in $(basename "$dir") ..."
  (
    cd "$dir"
    rm -rf node_modules package-lock.json
    npm install
  )
done
