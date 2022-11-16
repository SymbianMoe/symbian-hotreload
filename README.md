<h1 align="center">(beta) Hot Reload For FiveM</h1>

<p align="center">
  <i>:fire: (beta) A Hot Reload Script for FiveM :video_game:</i>
  <br>
  <br>
</p>

This is a basic hot-reload script for auto-loading and hot-reloading fivem scripts
THIS IS NOT A PRODUCTION VERSION AND YOU SHOULD NOT USE THIS IN YOUR LIVE SERVER

## Usage

1. Create a folder called `[hotreload]` in your `resources` folder.
2. Clone repository into your `resources/symbian-hotreload` folder.
3. `yarn` the dependencies.
4. Build the script using `yarn build`.
5. Add the script to your server config `ensure symbian-hotreload`
6. Add this line to your server config `add_ace resource.symbian-hotreload command allow`.
7. Now when you add any new script to `[hotreload]` folder the script will start it automatically and vice versa when deleting a script

## License

This script is MIT licensed. Please make sure you give credit and include this license in your server.
