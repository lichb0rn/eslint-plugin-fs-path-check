/**
 * @fileoverview Feature sliced relative path checker
 * @author Miroslav Taleiko
 */
'use strict';

/** @type {import('eslint').Rule.RuleModule} */

const path = require('node:path');
const { isRelativePath } = require('../helpers/index');

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Feature sliced relative path checker',
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
            avoidAbsolute: 'Avoid using absolute paths inside a module. Use relative instead.',
        },
    },

    create(context) {
        const alias = context.options[0]?.alias || '';

        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;
                const fromFilename = context.filename;

                if (shouldBeRelative(fromFilename, importTo)) {
                    context.report({
                        node,
                        messageId: 'avoidAbsolute',
                    });
                }
            },
        };
    },
};

const layers = {
    shared: 'shared',
    entities: 'entities',
    features: 'features',
    widgets: 'widgets',
    pages: 'pages',
};

function shouldBeRelative(from, to) {
    if (isRelativePath(to)) {
        return false;
    }

    const toArray = to.split('/');
    const toLayer = toArray[0];
    const toSlice = toArray[1];

    if (!toLayer || !toSlice || !layers[toLayer]) {
        return false;
    }

    const normalizedPath = path.toNamespacedPath(from);
    const projectFrom = normalizedPath.split('src')[1];
    if (!projectFrom) {
        return false;
    }
    const fromArray = projectFrom.split(path.sep);
    const fromLayer = fromArray[1];
    const fromSlice = fromArray[2];

    if (!fromLayer || !fromSlice || !layers[fromLayer]) {
        return false;
    }

    return fromSlice === toSlice && toLayer === fromLayer;
}
