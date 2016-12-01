# load-secrets
Platform agnostic secrets loader for `~/.secrets/project-name.env` or `process.env`

### Usage
---

```
const secrets = require('load-secrets')
```

To load secrets from a file, add a file called `<your-project-name>.env` to the `~/.secrets` folder, e.g.

```
mkdir -p ~/.secrets
touch ~/.secrets/package-name.env
```

The env file name must (case insensitively) match your project name in `package.json`.

In the env file, each new line will be parsed as a variable.

You may use quotes or omit them, if you omit them the output will be stripped:
```
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

```
export PROJECT_SECRET='I like the smell of gasoline 🙃'
```
is used via:
```
// package.json name is "project"
const secrets = require('load-secrets')
console.log(secrets.SECRET) // prints 'I like the smell of gasoline 🙃'
```
Project name is case insensitive, but case is retained on your vars, so `project_sEcreTs` is the same as `PROJECT_sEcreTs`, and both will produce `require('load-secrets').sEcreTs`

You do not need to prefix files in your `<project>.env` file, so the above in a file would be:

```
SECRET=I like the smell of gasoline 🙃
```

Secrets in the env will override secrets in your files, so if you need to test something quickly, just set it:

```
SECRET=foo node myprogram.js # SECRET is 'foo' regardless of what's in the env file
```
