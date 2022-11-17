
import chokidar from 'chokidar';

import {
    extractResourceName,
    checkIfValidResource,
    print
  } from './utils';

import {Resources} from './resources';

export class MyWatcher {
    private _watcher :chokidar.FSWatcher;
    private _initialized :boolean;
    private _resource_path :string | string[];
    private _resources :Resources;
    private _options :chokidar.WatchOptions;

    constructor(resources_path:any , options:chokidar.WatchOptions) {
        this._initialized = false;
        this._resource_path = resources_path;
        this._options = options;
        this._resources = new Resources();
    }

    private onReady(): void {
        this._initialized = true;
        print.watch('Initial scan complete. All resources are loaded. Ready for changes')
        print.debug('Watching for changes in', this._resource_path);
    }

    private onDirAdd(path: string) {
        const resourceName: string = extractResourceName(path);
        if (checkIfValidResource(path)) {
          print.complete(`Resource "${resourceName}" is valid, starting resource..`)
          this._resources.addResource(resourceName);
        }
    }

    private onDirUnlink(path: string): void {
        this._resources.removeResource(extractResourceName(path));
    }

    private onError(error: Error): void {
        print.error(`Watcher error: ${error}`)
    }

    public startWatching(): void {
        if (this._initialized){
            print.error(`Watcher error: Watcher is Already Started`)
            return;
        }
        this._watcher = chokidar.watch(this._resource_path, this._options);
        this._watcher.on('ready', () => this.onReady());
        this._watcher.on('addDir', (path) => this.onDirAdd(path));
        this._watcher.on('unlinkDir', (path) => this.onDirUnlink(path));
        this._watcher.on('error', (err) => this.onError(err));
    }
}