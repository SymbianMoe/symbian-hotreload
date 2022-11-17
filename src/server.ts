import chokidar from 'chokidar';
import { extractResourceName, fileExistsInPath, print } from './utils';
import { Resources } from './resources';
import { config } from './config';
import { prepareResourcePaths } from './utils';

print.info('TrueCore ResourceManager v1.0');
print.debug('Resource path: ", config.resources.paths');

const resourcePaths = prepareResourcePaths();
const resources = new Resources();

const watcher = chokidar.watch(resourcePaths, config.watchOptions).on('ready', (): void => {
  print.watch('Initial scan complete. All resources are loaded. Ready for changes');
  print.debug('Watching for changes in', resourcePaths);
});

watcher.on('all', (event: string, path: string): void => {
  print.debug(`Event: ${event} on path: ${path}`);
});

watcher.on('change', (path: string): void => {
  const resourceName = extractResourceName(path);
  print.info('Resource changed: ', resourceName);
  resources.removeResource(resourceName);
  resources.addResource(resourceName);
});

watcher.on('addDir', (path): void => {
  const resourceName: string = extractResourceName(path);

  // Check if resource is ignored
  if (config.resources.ignored.includes(resourceName)) {
    print.complete('Ignoring resource: ', resourceName);
    return;
  }

  // Check if resource is a valid resource
  if (fileExistsInPath(path, 'fxmanifest.lua')) {
    print.complete(`Resource "${resourceName}" is valid, starting resource..`);
    resources.addResource(resourceName);
  } else {
    print.pending(`Resource "${resourceName}" is not valid (no fxmanifest file detected)`);
  }
});

// On remove dir event handler
watcher.on('unlinkDir', (path): void => {
  resources.removeResource(extractResourceName(path));
});

watcher.on('error', (error): void => {
  print.error(`Watcher error: ${error}`);
});
