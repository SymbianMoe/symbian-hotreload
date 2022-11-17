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
            '[true]',
            'true-ui',
            'true-hotloader'
        ]
    },
    watchOptions: {
        awaitWriteFinish: {
            stabilityThreshold: 2000,
            pollInterval: 100
        },
        depth: 10,
        disableGlobbing: true,
        persistent: true,
        atomic: 500,
        ignoreInitial: false,
    },
    logger: {
        disabled: false,
        interactive: false,
        logLevel: 'info',
        followSymlinks: true,
        scope: 'ResourceManager',
        secrets: [],
        stream: process.stdout,
        ignored: /(^|[\/\\])\../,
    },
    directorySeparators: {
        'win32': '\\',
        'linux': '/',
    }
}
