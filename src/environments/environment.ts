// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend: 'http://localhost:3100',
  firebase: {
    apiKey: 'AIzaSyC7Tqs2o5n5RdaHL9hEmD3ZFC3hQE-uiVw',
    authDomain: 'crud-productos-unicor.firebaseapp.com',
    databaseURL: 'https://crud-productos-unicor.firebaseio.com',
    projectId: 'crud-productos-unicor',
    storageBucket: 'crud-productos-unicor.appspot.com',
    messagingSenderId: '206323469297',
    appId: '1:206323469297:web:4d89f4ce8c78c8cbe39250'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
