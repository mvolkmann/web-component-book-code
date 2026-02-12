In order to properly use custom-elements-manifest.config.js,
I had to modify the function getUserConfig in
custom-elements-manifest/packages/analyzer/src/utils/cli-helpers.js.
I changed the line
return /** @type {import('../../index').Config} \*/ (userConfig) || {};
to
return /** @type {import('../../index').Config} \*/ (userConfig.default) || {};

See the email to Burton Smith on 2/12/2026 at 12:37 PM.

Possibly the real error is in the readConfig function
defined in the @web/config-loader library.

TODO: See the issue at
https://github.com/igrlk/storybook-addon-test-codegen/issues/37.
