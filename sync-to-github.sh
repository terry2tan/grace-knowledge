#!/bin/bash
# Grace Knowledge Auto-Sync Script
# Commits all changes and pushes to GitHub
# Usage: bash sync-to-github.sh [commit message]

set -e
cd /home/ubuntu/.openclaw/workspace-grace/knowledge

MSG="${1:-auto-sync: $(date '+%Y-%m-%d %H:%M')}"

# Stage all changes
git add -A

# Check if there are changes to commit
if git diff --cached --quiet; then
  echo "No changes to sync."
  exit 0
fi

# Commit and push
git commit -m "$MSG"
git pull --rebase origin main
git push origin main

echo "✓ Synced to GitHub: $MSG"
