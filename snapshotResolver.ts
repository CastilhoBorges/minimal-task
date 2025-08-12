import type { SnapshotResolver } from 'jest-snapshot';
import path from 'node:path';

const snapshotResolver: SnapshotResolver = {
  resolveSnapshotPath: (
    testPath: string,
    snapshotExtension: string,
  ): string => {
    return path
      .join(
        path.dirname(testPath),
        '__snapshots__',
        path.basename(testPath) + snapshotExtension,
      )
      .replaceAll('\\', '/');
  },
  resolveTestPath: (
    snapshotFilePath: string,
    snapshotExtension: string,
  ): string => {
    return snapshotFilePath
      .replace('/__snapshots__', '')
      .slice(0, -snapshotExtension.length);
  },
  testPathForConsistencyCheck: 'src/__tests__/unit/example.spec.ts',
};

export default snapshotResolver;
