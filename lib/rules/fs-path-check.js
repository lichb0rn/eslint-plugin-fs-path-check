/**
 * @fileoverview Feature sliced relative path checker
 * @author Miroslav Taleiko
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Feature sliced relative path checker',
            recommended: false,
            url: null,
        },
        fixable: 'code',
        schema: [],
        messages: {
            avoidAbsolute:
                'Avoid using absolute paths inside a component. Use relative instead. {{file}}',
        },
    },

    create(context) {
        return {
            ImportDeclaration(node) {
                const importTo = node.source.value;
                const fromFilename = context.filename;

                context.report({ node, messageId: 'avoidAbsolute', data: { file: fromFilename } });
            },
        };
    },
};
