#!/usr/bin/env sh
# Maps a Conventional Commit message (squash merge: PR title + PR body) read
# from stdin to a semver bump: breaking -> major, feat -> minor, else patch.
set -eu

message=$(cat)
header=$(printf '%s\n' "$message" | head -n 1)

if printf '%s\n' "$header" | grep -qE '^[a-z]+(\([^)]*\))?!:' ||
  printf '%s\n' "$message" | grep -qE '^BREAKING[ -]CHANGE:'; then
  echo major
elif printf '%s\n' "$header" | grep -qE '^feat(\([^)]*\))?:'; then
  echo minor
else
  echo patch
fi
