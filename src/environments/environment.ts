import {BUSY_CONFIG_DEFAULTS} from 'angular2-busy';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ponicsApi: 'http://localhost:51272/',
  busyConfig: {
    message: 'Processing..',
    delay: 200,
    template: `
         <div class="loader">
          <div class="loader-loading"></div>
        </div>`,
    minDuration: BUSY_CONFIG_DEFAULTS.minDuration,
    backdrop: true,
    wrapperClass: BUSY_CONFIG_DEFAULTS.wrapperClass,
  },
};
