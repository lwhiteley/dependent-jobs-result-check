import * as core from '@actions/core';
// import * as github from '@actions/github';
import {wait} from './wait';

(async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds');
    const dependencies: string = core.getInput('dependencies');
    core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.info(dependencies);

    core.debug(new Date().toTimeString());
    await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
})();
