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

export class Resources {
    private resources: string[];
    constructor(){
        this.resources = [];
    }
    addResource(resource: string): void {
        const isStarted = StartResource(resource)
        if (isStarted){
            this.resources.push(resource);
        }
        else {
            ExecuteCommand("refresh");
            this.addResource(resource);
        }
    }
    removeResource(resource: string): void {
        const index = this.resources.indexOf(resource);
        if (index > -1) { // only splice array when item is found
            StopResource(resource);
            this.resources.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
}