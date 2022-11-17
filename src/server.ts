import { print, prepareResourcePaths } from './utils/utils';
import { config } from './config';
import { MyWatcher } from './utils/watcher';

print.info('TrueCore ResourceManager v1.0');
print.debug('Resource paths: ', config.resources.paths);

const resourcePaths = prepareResourcePaths();

const ServerWatcher = new MyWatcher(resourcePaths, config.watchOptions);
ServerWatcher.startWatching();
