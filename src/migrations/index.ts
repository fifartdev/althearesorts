import * as migration_20260625_083930 from './20260625_083930';
import * as migration_20260625_084813 from './20260625_084813';
import * as migration_20260625_085952 from './20260625_085952';
import * as migration_20260625_092717___name_add_imageurl_fields from './20260625_092717___name_add_imageurl_fields';

export const migrations = [
  {
    up: migration_20260625_083930.up,
    down: migration_20260625_083930.down,
    name: '20260625_083930',
  },
  {
    up: migration_20260625_084813.up,
    down: migration_20260625_084813.down,
    name: '20260625_084813',
  },
  {
    up: migration_20260625_085952.up,
    down: migration_20260625_085952.down,
    name: '20260625_085952',
  },
  {
    up: migration_20260625_092717___name_add_imageurl_fields.up,
    down: migration_20260625_092717___name_add_imageurl_fields.down,
    name: '20260625_092717___name_add_imageurl_fields'
  },
];
