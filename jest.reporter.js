const { join } = require("path");
const { existsSync, readFileSync } = require("fs");

class Reporter {
  constructor(globalConfig) {
    this.globalConfig = globalConfig;
  }

  onRunComplete() {
    if (
      !this.globalConfig.collectCoverage ||
      !this.globalConfig.coverageDirectory
    ) {
      return;
    }

    const jsonSummary = join(
      this.globalConfig.coverageDirectory,
      "coverage-summary.json",
    );

    if (!existsSync(jsonSummary)) {
      return;
    }

    const coverage = JSON.parse(readFileSync(jsonSummary, "utf-8"));
    const totalSum = ["lines", "statements", "functions", "branches"]
      .map((i) => coverage.total[i].pct)
      .reduce((a, b) => a + b, 0);
    const avgCoverage = totalSum / 4;
    console.info();
    console.info(
      "================================ Total Coverage ================================",
    );
    console.info(`Total Coverage: ${avgCoverage.toFixed(2)} %`);
    console.info(
      "================================================================================",
    );
  }
}

module.exports = Reporter;
