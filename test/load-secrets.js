const test = require('tape')
const loadSecrets = require('../load-secrets')
const path = require('path')

test('it loads prefixed secrets from the environment', t => {
  t.plan(2)
  let s = loadSecrets('prefix', {
    NOT_MY_VAR: '🙃',
    PREFIX_MY_VAR: '🙂'
  }, '.')
  t.equal(s.MY_VAR, '🙂', 'loads the correct var without a prefix')
  t.notOk(s.NOT_MY_VAR, 'does not load vars that are not prefixed')
})

test('it loads & parses secrets from a file', t => {
  t.plan(7)
  let s = loadSecrets('some-project', {}, path.join(__dirname, 'fixtures'))
  t.equal(Object.keys(s).length, 6, 'it does not load garbage')
  t.equal(s.FOO, 'foo', 'it loads vars with no quotes')
  t.equal(s.BAR, 'bar', 'it loads vars with double quotes')
  t.equal(s.BAZ, 'baz', 'it loads vars with single quotes')
  t.equal(s.COMMENTED, 'commented', 'does not include things past the quotes')
  t.equal(s.TRICKY, 'ricky "the frick" frickleson', 'it handles escaped quotes')
  t.equal(s.EMPTY, '', 'loads empty vars as empty strings')
})


test('it overrides file vars with env vars', t => {
  t.plan(1)
  let s = loadSecrets('some-project', {'SOME-PROJECT_FOO': 'IT WORKED'}, path.join(__dirname, 'fixtures'))
  t.equal(s.FOO, 'IT WORKED')
})
