type Result = {jobId: string; status: string};

type Report = {
  results: Result[];
  statuses: string[];
  jobs: string[];
};

type Input = {
  statuses: string;
  dependencies: Record<string, {result: string}>;
};

export function checkDependencies({statuses, dependencies}: Input): Report {
  const results = Object.entries(dependencies)
    .map(([jobId, {result}]) => {
      if (!statuses.includes(result)) {
        return undefined;
      }

      return {
        jobId,
        status: result,
      };
    })
    .filter(Boolean) as Result[];

  const statusesFound = results.map(({status}) => status);
  const jobs = results.map(({jobId}) => jobId);

  return {results, statuses: statusesFound, jobs};
}
