const { ReportBase } = require("istanbul-lib-report");

const green = (text) => `\x1b[32m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const bold = (text) => `\x1b[1m${text}\x1b[0m`;
const dim = (text) => `\x1b[2m${text}\x1b[0m`;

const colorize = (pct) => {
  const formatted = `${pct.toFixed(2)}%`.padStart(7);
  if (pct >= 90) return green(formatted);
  if (pct >= 70) return yellow(formatted);
  return red(formatted);
};

const bar = (pct, width = 24) => {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;
  const filledChar = "█".repeat(filled);
  const emptyChar = dim("⠶".repeat(empty));
  if (pct >= 90) return green(filledChar) + emptyChar;
  if (pct >= 70) return yellow(filledChar) + emptyChar;
  return red(filledChar) + emptyChar;
};

const LABEL_WIDTH = 12;

module.exports = class TotalCoverageReporter extends ReportBase {
  onStart(root) {
    const summary = root.getCoverageSummary(false);
    const metrics = [
      { key: "statements", label: "Statements" },
      { key: "branches", label: "Branches" },
      { key: "functions", label: "Functions" },
      { key: "lines", label: "Lines" },
    ];

    const totalSum = metrics
      .map((m) => summary[m.key].pct)
      .reduce((a, b) => a + b, 0);
    const avg = totalSum / metrics.length;

    const separator = dim("───────────────────────────────────────────────");

    console.info(bold("Coverage Summary"));
    console.info(separator);
    for (const m of metrics) {
      const pct = summary[m.key].pct;
      const label = m.label.padEnd(LABEL_WIDTH);
      console.info(` ${label} ${bar(pct)}  ${colorize(pct)}`);
    }
    console.info(separator);
    console.info(
      ` ${bold("Total".padEnd(LABEL_WIDTH))} ${bar(avg)}  ${bold(colorize(avg))}`,
    );
    console.info(separator);
  }
};
