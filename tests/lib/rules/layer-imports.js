/**
 * @fileoverview Prohibit imports from top layers in bottom
 * @author Miroslav Taleiko
 */
'use strict';

const rule = require('../../../lib/rules/layer-imports'),
    RuleTester = require('eslint').RuleTester;

const aliasOptions = [
    {
        alias: '@',
    },
];

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, sourceType: 'module' } });
ruleTester.run('layer-imports', rule, {
    valid: [
        {
            filename: '/Users/username/code/projects/someProject/src/features/SomeFeature',
            code: "import { Button } from '@/shared/Button'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: '/Users/username/code/projects/someProject/src/features/SomeFeature',
            code: "import { SomeEntity } from '@/entities/SomeEntity'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: '/Users/username/code/projects/someProject/src/app/providers',
            code: "import { SomeWidget } from '@/widgets/SomeWidget'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: '/Users/username/code/projects/someProject/src/widgets/SomeWidget',
            code: "import { useLocation } from 'react-router-dom'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: '/Users/username/code/projects/someProject/src/app/providers',
            code: "import { configureStore } from 'redux'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: '/Users/username/code/projects/someProject/src/index.tsx',
            code: "import { StoreProvider } from '@/app/providers/StoreProvider'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: '/Users/username/code/projects/someProject/src/entities/SomeEntity.ts',
            code: "import { StoreSchema } from '@/app/providers/StoreProvider'",
            errors: [],
            options: [{ alias: '@', ignoreImportPatterns: ['**/StoreProvider'] }],
        },
    ],

    invalid: [
        {
            filename: '/Users/username/code/projects/someProject/src/entities/SomeEntity.ts',
            code: "import { SomeFeature } from '@/features/SomeFeature'",
            errors: [{ messageId: 'avoidTopLayerImports' }],
            options: aliasOptions,
        },
        {
            filename: '/Users/username/code/projects/someProject/src/features/SomeFeature.ts',
            code: "import { SomeWidget } from '@/widgets/SomeWidget'",
            errors: [{ messageId: 'avoidTopLayerImports' }],
            options: aliasOptions,
        },
    ],
});
