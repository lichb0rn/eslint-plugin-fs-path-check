/**
 * @fileoverview Check if something is imported from the inside of a module and not from public api
 * @author Miroslav Taleiko
 */
'use strict';

/** @type {import('eslint').Rule.RuleModule} */

const { isRelativePath } = require('../helpers/index');

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
                },
            },
        ],
        messages: {
            avoidImportFromModule:
                'Avoid importing from the inside of the module. Use public api instead.',
        },
    },

    create(context) {
        const alias = context.options[0]?.alias || '';

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

                const layer = segments[0];

                if (!fsdLayers[layer]) {
                    return;
                }

                if (isImportNotFromPublicApi) {
                    context.report({
                        node,
                        messageId: 'avoidImportFromModule',
                    });
                }
            },
        };
    },
};
