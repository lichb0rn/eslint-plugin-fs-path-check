# Prohibit imports from top layers in bottom (`layer-imports`)

The rule checks if an underlying layer has imports from top layers (from 'app' in 'shared').

## Rule Details

This rule aims to keep consistency in module imports.

Examples of **incorrect** code for this rule:

```js
// file features/someFeature/ui/FeatureComponent.jsx
import { SomeWidget } from 'widgets/SomeWidget';
```

You shouldn't import from widgets layer to a module in features.

Examples of **correct** code for this rule:

```js
// file features/someFeature/ui/FeatureComponent.jsx
import { useEntity } from 'entities/SomeEntity';
```

### Options

You can specify alias and ignore patterns:

```js
"fs-path-check/layer-imports": ["warn", {
        "alias": "@",
        "ignoreImportPatterns": ["**/StoreProvider"]
    }
]
```

## When Not To Use It

The rule is made fro spicific use case to work the Feature-Sliced Design methology. Not suitable for
anything else.

## Further Reading

You can read about FSD [here](https://feature-sliced.design).
