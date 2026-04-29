#!/usr/bin/env bash
# One-shot: initialise the repo and push to GitHub.
# Usage: bash scripts/git-init.sh

set -euo pipefail

REPO_URL="https://github.com/omu70/bookmybhajan.git"

if [ -d .git ]; then
  echo "→ git repo already initialised"
else
  git init
fi

git add .
git commit -m "feat: initial BookMyBhajan platform" || echo "→ nothing to commit"

git branch -M main

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

echo "→ pushing to $REPO_URL ..."
git push -u origin main
echo "✓ done"
