import fs from 'fs';
import path from 'path';
import {Signale} from 'signale';
import {config} from './config';

export function fileExistsInPath(folder: string, file: string): boolean {
    return fs.existsSync(path.join(folder, file))
}
  
export function extractResourceName(path: string): string {
  return path.split(config.directorySeparators[process.platform]).pop() as string;
}

export const prepareResourcePaths = (): string[] => {
  return config.resources.paths.map(resourcePath => {
    return path.join(path.resolve(process.cwd()), 'resources', resourcePath)
  });
}

export const print = new Signale(config.logger);
