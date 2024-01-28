/**
 * @fileoverview Prohibit imports from top layers in bottom
 * @author Miroslav Taleiko
 */
'use strict';

const path = require('node:path');
const micromatch = require('micromatch');
const { isRelativePath } = require('../helpers');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Prohibit imports from top layers in bottom',
            recommended: false,
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    },
                    ignoreImportPatterns: {
                        type: 'array',
                    },
                },
            },
        ],
        messages: {
            avoidTopLayerImports: 'A layer could only import underlying layers.',
        },
    },

    create(context) {
        const layerRules = {
            app: ['pages', 'widgets', 'features', 'shared', 'entities'],
            pages: ['widgets', 'features', 'shared', 'entities'],
            widgets: ['features', 'shared', 'entities'],
            features: ['entities', 'shared'],
            entities: ['shared', 'entities'],
            shared: ['shared'],
        };

        const availableLayers = {
            app: 'app',
            entities: 'entities',
            features: 'features',
            shared: 'shared',
            pages: 'pages',
            widgets: 'widgets',
        };

        const { alias = '', ignoreImportPatterns = [] } = context.options[0] ?? {};

        const getCurrentFileLayer = () => {
            const currentFilePath = context.filename;
            const normalizedPath = path.toNamespacedPath(currentFilePath);
            const projectPath = normalizedPath.split('src')[1];
            console.warn(projectPath);
            const segments = projectPath.split(path.sep);

            return segments?.[1];
        };

        const getImportLayer = (value) => {
            const importPath = alias ? value.replace(`${alias}/`, '') : value;
            const segments = importPath?.split('/');

            return segments?.[0];
        };

        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;
                const currentFileLayer = getCurrentFileLayer();
                const importLayer = getImportLayer(importPath);

                if (isRelativePath(importPath)) {
                    return;
                }

                if (!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
                    return;
                }

                const isIgnored = ignoreImportPatterns.some((pattern) => {
                    return micromatch.isMatch(importPath, pattern);
                });

                if (isIgnored) {
                    return;
                }

                if (!layerRules[currentFileLayer]?.includes(importLayer)) {
                    context.report({ node, messageId: 'avoidTopLayerImports' });
                }
            },
        };
    },
};
