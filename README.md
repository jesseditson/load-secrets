# load-secrets
Platform agnostic secrets loader for `~/.secrets/project-name.env` or `process.env`

### Usage
---

```javascript
const secrets = require('load-secrets')
```

To load secrets from a file, add a file called `<your-project-name>.env` to the `~/.secrets` folder, e.g.

```shell
mkdir -p ~/.secrets
touch ~/.secrets/package-name.env
```

The env file name must (case insensitively) match your project name in `package.json`.

In the env file, each new line will be parsed as a variable.

You may use quotes or omit them, if you omit them the output will be stripped:
```shell
FOO=     W H O A    
> "W H O A"
FOO='     W H O A    '
> "     W H O A    "
FOO=  something with a # comment afer it
> "something with a"
FOO='comments are preserved in #quotes'
> "comments are preserved in #quotes"
```

To load secrets from the environment, make sure your secrets are prefixed with your project name, e.g.

```shell
export PROJECT_SECRET='I like the smell of gasoline 🙃'
```
is used via:
```javascript
// package.json name is "project"
const secrets = require('load-secrets')
console.log(secrets.SECRET) // prints 'I like the smell of gasoline 🙃'
```
Project name is case insensitive, but case is retained on your vars, so `project_sEcreTs` is the same as `PROJECT_sEcreTs`, and both will produce `require('load-secrets').sEcreTs`

Project name is also sanitized for bash variable name compatibility - so any special characters in your project name will be replaced with underscores in the prefix name.

> Example: if your project name is "my-project", the env var prefix would be `MY_PROJECT`.

You do not need to prefix files in your `<project>.env` file, so the above in a file would be:

```shell
SECRET=I like the smell of gasoline 🙃
```

Secrets in the env will override secrets in your files, so if you need to test something quickly, just set it:

```shell
SECRET=foo node myprogram.js # SECRET is 'foo' regardless of what's in the env file
```

> NOTE: this only works for secrets that are defined in your secrets file - so you can't set arbitrary secrets this way, and if you don't have an env file, you still must prefix secrets with your project name.

### Client-side Usage
---

While this package is not meant to be loaded on the client, it can be used in conjunction with a build tool (such as webpack) to decorate the package at runtime, allowing use of `process.env` on the client.

This is usually achieved by using something like https://webpack.js.org/plugins/environment-plugin/, which will automatically handle defining `process.env` for you, and having it fall back to an env from `load-secrets`.

```javascript
const webpack = require('webpack')
const secrets = require('load-secrets')

const envPlugin = new webpack.EnvironmentPlugin({
  MY_PROJECT_MY_SECERT: secrets.MY_SECRET
})
```

This allows for isomorphic builds of applications that use this library, and use of `~/.secrets` when developing locally without checking in dev configs.
