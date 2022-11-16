import path from 'path';
import chokidar from 'chokidar';
import { extractResourceName,checkIfValidResource, Resources } from './utils';

// get server path
const resource_path = path.resolve(process.cwd());

// add /resources/[hotreload] dir to path
const scripts_path = path.join(resource_path, 'resources','[hotreload]');

// just a class to handle resource in memory
const resources = new Resources();


// init watcher
const watcher = chokidar.watch(scripts_path, {
  persistent: true,
  depth :0,
  disableGlobbing: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },
})

// make sure the watch started
watcher.on('ready', () => console.log('Initial scan complete. Ready for changes'));

// on add dir event handler
watcher.on('addDir', ( path)=> {
  const res_name = extractResourceName(path);
  // on the initial run the script will read the root folder as a resource so we need to ignore it
  if (res_name !== "[hotreload]") {
    console.log("new resource found: " + res_name);
    if (checkIfValidResource(path)) {
      console.log("resource is valid")
      resources.addResource(res_name);
    } else {
      console.log(`ERR : resource ${res_name} is not valid (no fxmanifest file detected)`)
    }
  }
})

// on remove dir event handler
watcher.on('unlinkDir', ( path)=> {
  const res_name = extractResourceName(path);
  console.log("resource deleted: " + res_name);
  resources.removeResource(res_name);
})



watcher.on('error', error => console.log(`Watcher error: ${error}`))