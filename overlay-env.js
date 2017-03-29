module.exports = function overlayEnv(env, name, out) {
  out = out || {}
  var prefix = name.replace(/[^\w]/g, '_')
  var pattern = new RegExp('^' + prefix + '_', 'i')
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
