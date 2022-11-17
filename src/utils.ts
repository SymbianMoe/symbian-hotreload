import fs from 'fs';
import path from 'path';
import { Signale } from 'signale';
import { config } from './config';

export function fileExistsInPath(folder: string, file: string): boolean {
  return fs.existsSync(path.join(folder, file));
}

export function checkIfValidResource(resource_path: string): boolean {
  const fx_manifest = path.join(resource_path, 'fxmanifest.lua');
  if (fileExistsInPath(resource_path, 'fxmanifest.lua')) {
    const fx_manifest_contents = fs
      .readFileSync(path.join(resource_path, 'fxmanifest.lua'), { encoding: 'utf8' })
      .toString();
    const fx_version = fx_manifest_contents.search('fx_version');
    const game_type = fx_manifest_contents.search('game');
    if (fx_version !== -1 && game_type !== -1) {
      return true;
    } else {
      print.error('invalid resource (empty fxmanifest)');
      return false;
    }
  }
  print.error('invalid resource (no fxmanifest file)');
  return false;
}

export function extractResourceName(path: string): string {
  return path.split(config.directorySeparators[process.platform]).pop() as string;
}

export const prepareResourcePaths = (): string[] => {
  return config.resources.paths.map(resourcePath => {
    return path.join(path.resolve(process.cwd()), 'resources', resourcePath);
  });
};

export const print = new Signale(config.logger);
