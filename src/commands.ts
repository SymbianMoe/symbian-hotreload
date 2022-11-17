import { FSWatcher } from 'chokidar';
import { print } from './utils';

export const CreateWatchCommand = (watcher: FSWatcher): void => {
  RegisterCommand(
    'watch',
    (source: number, resources: string[]): void => {
      if (resources.length === 0) print.error('Please specify a resource');

      resources.forEach(resource => {
        print.debug('Watching resource: ', resource);
        watcher.add(resource);
      });
    },
    false,
  );
};

export const CreateUnwatchCommand = (watcher: FSWatcher): void => {
  RegisterCommand(
    'unwatch',
    (source: number, resources: string[]): void => {
      if (resources.length === 0) print.error('Please specify a resource');
      if (['all', '*'].includes(resources[0])) {
        watcher.close();
        print.debug('Watcher Stopped');
        return;
      }

      resources.forEach(resource => {
        print.debug('Unwatching resource: ', resource);
        watcher.unwatch(resource);
      });
    },
    false,
  );
};
