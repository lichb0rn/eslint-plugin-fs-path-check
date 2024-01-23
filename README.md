# eslint-plugin-fs-path-check

Feature sliced architecure path checker. Check
[Feature-sliced design Guide](https://feature-sliced.design) for more info.

## Warn

The plugin is in development. Right now works only if project source code is located under 'src/'
folder.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fs-path-check`:

```sh
npm install eslint-plugin-fs-path-check --save-dev
```

## Usage

Add `fs-path-check` to the plugins section of your `.eslintrc` configuration file. You can omit the
`eslint-plugin-` prefix:

```json
{
    "plugins": ["fs-path-check"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fs-path-check/fs-path-check": "warn"
    }
}
```

If have alias in your project you should configure it:

```json
{
    "rules": {
        "fs-path-check/fs-path-check": ["warn", { "alias": "@" }]
    }
}
```
