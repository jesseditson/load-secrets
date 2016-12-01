const test = require('tape')

test('index loads', t => {
  t.plan(2)
  var s
  t.doesNotThrow(() => {
    s = require('..')
  })
  t.ok(s)
})
