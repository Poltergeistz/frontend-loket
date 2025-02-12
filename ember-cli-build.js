'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const customBuildConfig = {
    // Add options here
    'ember-cli-babel': {
      includePolyfill: true,
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    '@lblod/ember-submission-form-fields': {
      includeTableComponents: false,
      includeSearchComponents: false,
    },
  };

  if (process.env.EMBER_TEST_SELECTORS_STRIP == 'false') {
    customBuildConfig['ember-test-selectors'] = { strip: false };
  } else if (process.env.EMBER_TEST_SELECTORS_STRIP == 'true') {
    customBuildConfig['ember-test-selectors'] = { strip: true };
  }
  //if EMBER_TEST_SELECTORS_STRIP left unspecificied, we fall back to default behavoir

  let app = new EmberApp(defaults, customBuildConfig);

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
