# Check if something is imported from the inside of a module and not from public api (`public-api-imports`)

This rule checks if a module is imported from the inside of the module structure and not from public
api.

## Rule Details

This rule aims to keep consistency in module imports.

Examples of **incorrect** code for this rule:

```js
// file features/someFeature/ui/FeatureComponent.jsx
import { useEntity } from 'entities/SomeEntity/lib/hooks/useEntity';
```

Examples of **correct** code for this rule:

```js
// file features/someFeature/ui/FeatureComponent.jsx
import { useEntity } from 'entities/SomeEntity';
```

### Options

If you use aliases in your project, you should configure it

```js
"fs-path-check/public-api-imports": ["warn", { "alias": "@" }]
```

Also you can allow imports from testing public api to specific files:

```js
// file: features/someFeature/testing.ts
export { someReducer } from './model/slices/someSlice.js';
```

```js
// file: StorybookDecorator.jsx
import { someReducre } from 'features/someFeature/testing';
```

```js
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

## When Not To Use It

The rule is made fro spicific use case to work the Feature-Sliced Design methology. Not suitable for
anything else.

## Further Reading

You can read about FSD [here](https://feature-sliced.design).
