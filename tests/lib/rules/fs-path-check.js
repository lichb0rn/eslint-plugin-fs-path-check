/**
 * @fileoverview Feature sliced relative path checker
 * @author Miroslav Taleiko
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/fs-path-check'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run('fs-path-check', rule, {
    valid: [
        {
            filename: '/Users/testUser/code/project-name/src/features/articleRecommendationsList',
            code: "import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';",
            errors: [
                {
                    message: 'Avoid using absolute paths inside a module. Use relative instead.',
                },
            ],
        },
    ],

    invalid: [
        {
            filename: '/Users/testUser/code/project-name/src/features/articleRecommendationsList',
            code: "import { useArticleRecommendationsList } from 'features/articleRecommendationsList/api/articleRecommendationsApi';",
            errors: [
                {
                    message: 'Avoid using absolute paths inside a module. Use relative instead.',
                },
            ],
        },
        {
            filename: '/Users/testUser/code/project-name/src/features/articleRecommendationsList',
            code: "import { useArticleRecommendationsList } from '@/features/articleRecommendationsList/api/articleRecommendationsApi';",
            errors: [
                {
                    message: 'Avoid using absolute paths inside a module. Use relative instead.',
                },
            ],
            options: [{ alias: '@' }],
        },
    ],
});
