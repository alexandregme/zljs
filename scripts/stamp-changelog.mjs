// Runs from the "version" script of `npm version`: moves the [Unreleased] entries
// of CHANGELOG.md under the new version and updates the compare links, so the
// release commit carries them. A release with no entries leaves the file as it is.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "CHANGELOG.md";
const HEADING = "## [Unreleased]\n";
const LINK = /^\[Unreleased\]: (.+)\/compare\/(\S+)\.\.\.HEAD$/m;

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const changelog = readFileSync(FILE, "utf8");

const start = changelog.indexOf(HEADING);
const link = changelog.match(LINK);
if (start === -1 || !link) {
  throw new Error(`${FILE} needs the [Unreleased] heading and compare link`);
}

const bodyStart = start + HEADING.length;
const nextVersion = changelog.indexOf("\n## ", bodyStart);
const bodyEnd = nextVersion === -1 ? link.index : nextVersion + 1;
const body = changelog.slice(bodyStart, bodyEnd).trim();

if (body) {
  const [line, repository, previous] = link;
  const tag = `v${version}`;
  const date = new Date().toISOString().slice(0, 10);
  const stamped = `${changelog.slice(0, start)}${HEADING}\n## [${version}] - ${date}\n\n${body}\n\n${changelog.slice(bodyEnd)}`;

  writeFileSync(
    FILE,
    stamped.replace(
      line,
      `[Unreleased]: ${repository}/compare/${tag}...HEAD\n[${version}]: ${repository}/compare/${previous}...${tag}`,
    ),
  );
}
