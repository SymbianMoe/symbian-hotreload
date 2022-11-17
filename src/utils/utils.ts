import fs from 'fs';
import path from 'path';
import { Signale } from 'signale';
import {config} from '../config';

export function fileExistsInPath(folder: string, file: string): boolean {
    return fs.existsSync(path.join(folder, file))
}

export function checkIfValidResource(resource_path:string) : boolean {
    const resource_name = getLastDir(resource_path)
    if (config.resources.paths.some(s => resource_name.includes(s) )){
      return false;
    }
    const fx_manifest = path.join(resource_path,'fxmanifest.lua');
    if (fileExistsInPath(resource_path, 'fxmanifest.lua')) {
        const fx_manifest_contents = fs.readFileSync(fx_manifest, {encoding: 'utf8'}).toString();
        const fx_version = fx_manifest_contents.search('fx_version');
        const game_type = fx_manifest_contents.search('game');
        if (fx_version !== -1 && game_type !== -1) {
            return true;
        } else {
            print.error(`invalid resource: ${resource_name} (empty fxmanifest)`);
            return false;
        }
    }
    print.error(`invalid resource: ${resource_name} (no fxmanifest file)`);
    return false;
}
  

// [ture]/test/client
export function extractResourceName(path: string): string {
  return splitMulti(path,config.resources.paths).pop().split(config.directorySeparators[process.platform]).pop();
}

export function getLastDir(path: string): string {
  return path.split(config.directorySeparators[process.platform]).pop();
}

export const prepareResourcePaths = (): string[] => {
  return config.resources.paths.map(resourcePath => {
    return path.join(path.resolve(process.cwd()), 'resources', resourcePath)
  });
}


export function splitMulti(str:string, separatorsArr:string[]) : string[]{
  //  Removing [] from the string (because regex doesn't support it)
  const separators = separatorsArr.map((val)=>{
      val = val.split('[').join('');
      val = val.split(']').join('');
      return val;
  }) // adding the equivalent to [] in regex to values and generates regex expression
  .reduce((prev,curr,index,arr)=>{
      prev += `[\x5B]${curr}]${index != arr.length-1 ? "|":"" }`;
      return prev
  },"")
  
  const tempChar = 't3mp'; //prevent short text separator in split down
  // split by regex e.g. \b(or|and)\b then trim & remove empty
  const re = new RegExp('\.('+ separators +')', "g");
  return str.replace(re, tempChar).split(tempChar).map(el => el.trim()).filter(el => el.length > 0);
}


export const print = new Signale(config.logger);
