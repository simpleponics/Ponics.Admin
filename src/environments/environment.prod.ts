import {BUSY_CONFIG_DEFAULTS} from 'angular2-busy';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */



export const environment = {
  production: true,
  ponicsApi: 'https://api.simpleponics.io/',
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
