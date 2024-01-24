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
    ],

    invalid: [
        {
            code: "import { someActions, someReducer } from '@/entities/SomeEntity/model/slice.js'",
            errors: [
                {
                    message:
                        'Avoid importing from the inside of the module. Use public api instead.',
                },
            ],
            options: aliasOptions,
        },
    ],
});
