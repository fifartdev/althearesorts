import * as migration_20260625_083930 from './20260625_083930';

export const migrations = [
  {
    up: migration_20260625_083930.up,
    down: migration_20260625_083930.down,
    name: '20260625_083930'
  },
];
