/**
 * @fileoverview Check if something is imported from the inside of a module and not from public api
 * @author Miroslav Taleiko
 */
'use strict';

const rule = require('../../../lib/rules/public-api-imports'),
    RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});

const aliasOptions = [
    {
        alias: '@',
    },
];

ruleTester.run('public-api-imports', rule, {
    valid: [
        {
            code: "import { someActions, someReducer } from '../../model/slices/someSlice.js'",
            errors: [],
        },
        {
            code: "import { AddCommentForm } from '@/features/AddComment'",
            errors: [],
            options: aliasOptions,
        },
        {
            filename: '/User/user/project/src/entities/file.test.ts',
            code: "import { AddCommentForm } from '@/features/AddComment/testing'",
            errors: [],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.test.ts', '**/SomeDecorator.tsx'],
                },
            ],
        },
        {
            filename: '/User/user/project/src/entities/SomeDecorator.tsx',
            code: "import { AddCommentForm } from '@/features/AddComment/testing'",
            errors: [],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.test.ts', '**/SomeDecorator.tsx'],
                },
            ],
        },
    ],

    invalid: [
        {
            code: "import { someActions, someReducer } from '@/entities/SomeEntity/model/slice.js'",
            errors: [
                {
                    messageId: 'avoidImportFromModule',
                },
            ],
            options: aliasOptions,
        },
        {
            filename: '/User/user/project/src/entities/SomeDecorator.tsx',
            code: "import { AddCommentForm } from '@/features/AddComment/testing/files.ts'",
            errors: [{ messageId: 'avoidImportFromModule' }],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.test.ts', '**/SomeDecorator.tsx'],
                },
            ],
        },
        {
            filename: '/User/user/project/src/entities/forbidden.js',
            code: "import { AddCommentForm } from '@/features/AddComment/testing'",
            errors: [{ messageId: 'avoidImportFromTesting' }],
            options: [
                {
                    alias: '@',
                    testFilesPatterns: ['**/*.test.js', '**/SomeDecorator.jsx'],
                },
            ],
        },
    ],
});
