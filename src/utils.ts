import fs from 'fs';
import path from 'path';

export function checkIfValidResource(resource_path:string) : boolean {
    const fx_manifest = path.join(resource_path, 'fxmanifest.lua');
    if (fs.existsSync(fx_manifest)) {
      return true;
    }
    return false;
}
  
export function extractResourceName(path: string):string {
    const pathArr = path.split('\\');
    return pathArr[pathArr.length-1]; 
}

export const print = {
    error : (msg:string):void => console.log(`\x1b[31m[HOTRELOAD:ERROR] \x1b[0m${msg}`),
    success : (msg:string):void => console.log(`\x1b[32m[HOTRELOAD:SUCCESS] \x1b[0m${msg}`),
    info: (msg:string):void => console.log(`\x1b[33m[HOTRELOAD:INFO] \x1b[0m${msg}`),
}