const SECRETS_DIR = path.join(os.homedir(), '.secrets')
const ENV = process.env
const PKG_NAME = loadPackage().name

module.exports = require('./load-secrets')(PKG_NAME, ENV, SECRETS_DIR)

/**
 * loadPackage
 * same as require(process.cwd() + 'package.json'), except it throws a nicer error when it doesn't exist.
 * @return {Object} parsed package.json
 */
function loadPackage() {
  var pkg
  try {
    pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')), 'utf8')
  } catch (e) {
    console.error('ERROR: failed reading package.json from directory ' + process.cwd() + '. Please make sure package.json exists and is valid JSON.')
    throw e
  }
  return pkg
}
