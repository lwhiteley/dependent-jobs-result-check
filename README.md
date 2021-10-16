# dependent-jobs-result-check

[![build-test](https://github.com/lwhiteley/dependent-jobs-result-check/actions/workflows/test.yml/badge.svg)](https://github.com/lwhiteley/dependent-jobs-result-check/actions/workflows/test.yml)

Github action to check dependent jobs results.

Example usage

This scenario simulates a job that is always run but still needs to figure out if it should fail or not based on its dependent job statuses

```yaml
main-completion-status:
  runs-on: ubuntu-latest # windows-latest | macos-latest
  name: aggregated results
  needs: [required_build_1, required_build_2, required_build_3]
  if: always()
  steps:
    - uses: lwhiteley/dependent-jobs-result-check@v1
      id: check_statuses
      with:
        statuses: failure,cancelled # valid options: failure,cancelled,skipped,success
        dependencies: ${{toJSON(needs)}}
    - name: log output
      run: |
        echo "statuses:" "${{ steps.check_statuses.outputs.statuses }}" # comma list of matching statuses
        echo "jobs:" "${{ steps.check_statuses.outputs.jobs }}" # comma list of jobs with matching statuses
        echo "found any?:" "${{ steps.check_statuses.outputs.found }}" # boolean if any statuses were found or not
    - name: consider failing build
      if: fromJSON(steps.check_statuses.outputs.found)
      run: |
        exit 1
```
