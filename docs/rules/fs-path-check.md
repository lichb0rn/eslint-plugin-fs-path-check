# Feature sliced relative path checker (`fs-path-check`)

This rule checks for compliance with the Feature-Sliced Design (FSD) recommendations for importing
modules from the same layer.

## Rule Details

This rule aims to keep consistency in module imports.

Examples of **incorrect** code for this rule:

```js
// file features/someFeature/ui/FeatureComponent.jsx
import { useArticleRecommendationsList } from 'features/someFeature/api/featiureApi';
```

All imports from the same layer should be relative.

Examples of **correct** code for this rule:

```js
// file features/someFeature/ui/FeatureComponent.jsx
import { useArticleRecommendationsList } from '../../api/featiureApi';
```

### Options

If you use aliases in your project, you should configure it

```js
"fs-path-check/fs-path-check": ["warn", { "alias": "@" }]
```

## When Not To Use It

The plugin is made fro spicific use case to work the Feature-Sliced Design methology. Not suitable
for anything else.

## Further Reading

You can read about FSD [here](https://feature-sliced.design).
