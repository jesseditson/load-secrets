// Detect if we're in node.js and attempt to load files.
// if we're not, only load from process.env
// this is useful when using things like https://webpack.js.org/plugins/environment-plugin/ that polyfill process.env on the client.
const ENV = process.env
const NODE_AVAILABLE = typeof module !== 'undefined' && module.exports && !process.browser
if (NODE_AVAILABLE) {
  const path = require('path')
  const os = require('os')
  SECRETS_DIR = path.join(os.homedir(), '.secrets')
  PKG_NAME = require('./load-package')().name
  module.exports = require('./load-secrets')(PKG_NAME, ENV, SECRETS_DIR)
} else {
  PKG_NAME = ENV.PKG_NAME
  if (!PKG_NAME) throw new Error('ERROR: failed to load secrets. You must define process.env.PKG_NAME when using load-secrets in the browser.')
  module.exports = require('./overlay-env')(ENV, PKG_NAME)
}
