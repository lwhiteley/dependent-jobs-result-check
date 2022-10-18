import {expect, test} from '@jest/globals';
import {checkDependencies} from '../src/check-dependencies';

test('should return empty report when input empty', () => {
  const input = {statuses: '', dependencies: {}};
  expect(checkDependencies(input)).toEqual({
    jobs: [],
    results: [],
    statuses: [],
  });
});

test('should return empty report when statuses empty', () => {
  const input = {statuses: '', dependencies: {build: {result: 'success'}}};
  expect(checkDependencies(input)).toEqual({
    jobs: [],
    results: [],
    statuses: [],
  });
});

test('should return filled report when statuses and dependencies are as expected', () => {
  const input = {
    statuses: 'success,failure,skipped,cancelled',
    dependencies: {build: {result: 'success'}},
  };
  expect(checkDependencies(input)).toEqual({
    jobs: ['build'],
    results: [{jobId: 'build', status: 'success'}],
    statuses: ['success'],
  });
});

test('should return filled report when statuses and multi dependencies are as expected', () => {
  const input = {
    statuses: 'success,failure,skipped,cancelled',
    dependencies: {
      build: {result: 'success'},
      build_extra: {result: 'failure'},
    },
  };
  expect(checkDependencies(input)).toEqual({
    jobs: ['build', 'build_extra'],
    results: [
      {jobId: 'build', status: 'success'},
      {jobId: 'build_extra', status: 'failure'},
    ],
    statuses: ['success', 'failure'],
  });
});
