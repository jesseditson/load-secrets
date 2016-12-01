const test = require('tape')
const stripQuotes = require('../strip-quotes')

test('strips single quotes', t => {
  t.plan(1)
  t.equal(stripQuotes("'foo'"), 'foo')
})

test('strips double quotes', t => {
  t.plan(1)
  t.equal(stripQuotes('"foo"'), 'foo')
})

test('handles escaped quotes', t => {
  t.plan(1)
  t.equal(stripQuotes("'That\\'s great'"), "That's great")
})
