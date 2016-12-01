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

test('strips spaces when not in quotes', t => {
  t.plan(2)
  t.equal(stripQuotes('     W H O A    '), 'W H O A')
  t.equal(stripQuotes('"     W H O A    "'), '     W H O A    ')
})

test('stops at # if not inside quotes', t => {
  t.plan(2)
  t.equal(stripQuotes('"hashtag #fuzz"'), 'hashtag #fuzz')
  t.equal(stripQuotes('no hashtag #fuzz'), 'no hashtag')
})
