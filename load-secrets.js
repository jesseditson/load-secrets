const fs = require('fs')
const path = require('path')
const os = require('os')
const stripQuotes = require('./strip-quotes')

const VALID_LINE = /^\s*.+=/

module.exports = function loadSecrets(name, env, dir) {
  var secretsFile = findFile(dir, name)

  var secrets = {}
  if (secretsFile && fs.existsSync(secretsFile)) {
    var str = fs.readFileSync(secretsFile, 'utf8')
    var lines = str.split(/\r?\n/)
    lines.forEach(function(line) {
      if (VALID_LINE.test(line)) {
        var parts = line.split('=')
        secrets[parts[0]] = stripQuotes(parts[1])
      }
    })
  }
  return overlayEnv(env, name, secrets)
}

function findFile(dir, name) {
  var pattern = new RegExp('^' + name + '$', 'i')
  var files = fs.readdirSync(dir)
  for (var idx in files) {
    var f = files[idx]
    if (pattern.test(path.basename(f, path.extname(f)))) {
      return path.join(dir, f)
    }
  }
}

function overlayEnv(env, name, out) {
  var pattern = new RegExp('^' + name + '[_-]', 'i')
  // allow overriding anything in the env file without a prefix
  Object.keys(out).forEach(function(key) {
    if (env[key]) {
      out[key] = env[key]
    }
  })
  // get secrets with name prefix from the env
  Object.keys(env).forEach(function(key) {
    if (pattern.test(key)) {
      out[key.replace(pattern, '')] = env[key]
    }
  })
  return out
}
