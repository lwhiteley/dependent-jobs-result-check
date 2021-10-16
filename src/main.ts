import * as core from '@actions/core';
import {checkDependencies} from './check-dependencies';

(async function run(): Promise<void> {
  try {
    const statuses: string = core.getInput('statuses');
    const dependencies = JSON.parse(core.getInput('dependencies'));
    if (!dependencies) {
      throw new Error('Could not read dependencies');
    }
    const report = checkDependencies({dependencies, statuses});

    core.info(`report:\n ${JSON.stringify(report, null, 2)}`);

    const found = !!report.results.length;

    core.setOutput('found', found.toString());
    core.setOutput('jobs', report.jobs.join(','));
    core.setOutput('statuses', report.statuses.join(','));
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
})();
