const test = require('tape')

const setup = () => {
  delete require.cache[require.resolve('..')]
}

test('index loads', t => {
  setup()
  t.plan(2)
  var s
  t.doesNotThrow(() => {
    s = require('..')
  })
  t.ok(s)
})

test('it errors if there is no package.json file', t => {
  setup()
  t.plan(1)
  var cwd = process.cwd()
  process.chdir(cwd + '/test')
  t.throws(() => {
    require('..')
  })
  process.chdir(cwd)
})
