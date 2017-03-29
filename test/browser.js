const test = require('tape')

const setup = () => {
  delete require.cache[require.resolve('..')]
}

test('it loads directly from env if in the browser and PKG_NAME is defined', t => {
  setup()
  const browser = process.browser
  process.browser = true
  process.env.PKG_NAME = 'foo-bar'
  process.env.FOO_BAR_SECRET = '🕵️‍'
  let cwd = process.cwd()
  process.chdir(cwd + '/test')

  t.plan(3)
  let secrets = null
  t.doesNotThrow(() => {
    secrets = require('..')
  })
  t.ok(secrets)
  t.equal(secrets.SECRET, '🕵️‍')

  process.chdir(cwd)
  process.browser = browser
})


test('it throws when running in the browser if PKG_NAME is not defined', t => {
  setup()
  const browser = process.browser
  process.browser = true
  process.env.FOO_BAR_SECRET = '🕵️‍'
  delete process.env.PKG_NAME
  const cwd = process.cwd()
  process.chdir(cwd + '/test')

  t.plan(1)
  t.throws(() => {
    require('..')
  })

  process.chdir(cwd)
  process.browser = browser
})
