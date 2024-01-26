/**
 * @fileoverview Check if something is imported from the inside of a module and not from public api
 * @author Miroslav Taleiko
 */
'use strict';

/** @type {import('eslint').Rule.RuleModule} */

const { isRelativePath } = require('../helpers/index');
const micromatch = require('micromatch');

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'Check if something is imported from the inside of a module and not from public api',
            recommended: false,
            url: null,
        },
        fixable: 'code',
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    },
                    testFilesPatterns: {
                        type: 'array',
                    },
                },
            },
        ],
        messages: {
            avoidImportFromModule:
                'Avoid imports from the inside of the module. Use public api instead.',
            avoidImportFromTesting: 'Import test data from publicApi/testing',
        },
    },

    create(context) {
        const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {};

        const fsdLayers = {
            entities: 'entities',
            features: 'features',
            widgets: 'widgets',
            pages: 'pages',
        };

        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;

                if (isRelativePath(importTo)) {
                    return;
                }

                const segments = importTo.split('/');
                const isImportNotFromPublicApi = segments.length > 2;

                // segments = [entities, article, testing]
                const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4;

                const layer = segments[0];

                if (!fsdLayers[layer]) {
                    return;
                }

                if (isImportNotFromPublicApi && !isTestingPublicApi) {
                    context.report({
                        node,
                        messageId: 'avoidImportFromModule',
                    });
                }

                if (isTestingPublicApi) {
                    const currentFilePath = context.filename;
                    const isCurrectFileTesting = testFilesPatterns.some((pattern) =>
                        micromatch.isMatch(currentFilePath, pattern)
                    );

                    if (!isCurrectFileTesting) {
                        context.report({
                            node,
                            messageId: 'avoidImportFromTesting',
                        });
                    }
                }
            },
        };
    },
};
