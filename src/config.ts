import { WatchOptions } from "chokidar"

// TODO: improve type on logger
type Config = {
    version: number,
    resources: {
        paths: string[],
        ignored: string[] | null,
    },
    watchOptions: WatchOptions,
    logger: any,
    directorySeparators: {
        [SupportedPlatforms.linux]: string,
        [SupportedPlatforms.win32]: string,
    }
}


export enum SupportedPlatforms {
    win32 = "win32",
    linux = "linux",
}

export const config: Config = {
    version: 1.0,
    resources: {
        paths: [
            '[true]'
        ],
        ignored: [
            'true-ui',
            'true-hotloader',
            'node_modules',
            '.env',
            '.github',
            '.editorconfig',
            '.eslintignore',
            'package.json',
            'README.md',
            'webpack.config.js',
            'yarn.lock',
            '.yarn.installed',
            'LICENSE',
        ]
    },
    watchOptions: {
        awaitWriteFinish: {
            stabilityThreshold: 2000,
            pollInterval: 100
        },
        depth: 0,
        disableGlobbing: true,
        persistent: true,
        atomic: 500,
        ignoreInitial: false,
        ignored: (path:string):boolean => config.resources.ignored.some(s => path.includes(s)),
    },
    logger: {
        disabled: false,
        interactive: false,
        logLevel: 'info',
        followSymlinks: true,
        scope: 'ResourceManager',
        secrets: [],
        stream: process.stdout,
    },
    directorySeparators: {
        'win32': '\\',
        'linux': '/',
    },

}
