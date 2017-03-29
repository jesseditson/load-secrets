const path = require('path')
const fs = require('fs')

/**
 * loadPackage
 * same as require(process.cwd() + 'package.json'), except it throws a nicer error when it doesn't exist.
 * @return {Object} parsed package.json
 */
module.exports = function loadPackage() {
  var pkg
  try {
    pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')), 'utf8')
  } catch (e) {
    console.error('ERROR: failed reading package.json from directory ' + process.cwd() + '. Please make sure package.json exists and is valid JSON.')
    throw e
  }
  return pkg
}
