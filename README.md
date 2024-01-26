# eslint-plugin-fs-path-check

Feature sliced architecure path checker. Check
[Feature-sliced design Guide](https://feature-sliced.design) for more info.

## Warn

The plugin is in development.

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
        "fs-path-check/fs-path-check": "warn",
        "fs-path-check/public-api-imports": "warn"
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

If you want to import something not from public api (`index.{js|ts}`), you can make a testing public
api.

Suppose you you want to import a reducer, which is not exported from you `index.{js|ts}` public api,
to your Storybook decorator or test. You can decalre a 'testing public api' - `testing.{js|ts}`:

```json
export { loginReducer } from './model/slice/loginSlice';
```

And then add a regex to your `.eslintrc` file:

```json
{
    "rules": {
        "fs-path-check/public-api-imports": [
            "warn",
            {
                "alias": "@",
                "testFilesPatterns": ["**/*.test.js", "**/StorybookDecorator.jsx"]
            }
        ]
    }
}
```

Not it's prerfectly legint to import `loginReducer` to your `StorybookDecorator.jsx`.
