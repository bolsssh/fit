/* jshint node: true */

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'core',
    environment: environment,
    baseURL: '/',
    backendURL: 'https://localhost:44345',
    locationType: 'auto',
    //imgPath: 'assets/images/',
    EmberENV: {
      FEATURES: {
        //'ember-metal-ember-assign': true,
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    // 'ember-simple-auth-jwt': {
    //   headers: {
    //     'sec-fetch-mode': 'cors',
    //   },
    // }
  };
  
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.authServerBaseUrl = ENV.backendURL;
    ENV.authServerTokenEndpoint = `${ENV.authServerBaseUrl}/api/auth`;
    ENV.authServerRefreshTokenEndpoint = `${ENV.authServerBaseUrl}/api/auth`;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
