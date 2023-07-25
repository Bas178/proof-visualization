// Monarch syntax highlighting for the c-parser-3 language.
const symbolsStr = "!|!=|%|%=|&|&&|&\\*&|&=|\\(|\\)|\\*|\\*=|\\+|\\+\\+|\\+=|,|-|--|-=|->|\\.|\\.\\.\\.|/|/=|:|;|<|<<|<<=|<=|=|==|>|>=|>>|>>=|\\?|@\\*/|\\[|\\]|\\^|\\^=|\\{|\\||\\|->|\\|=|\\|\\||\\}|~/";
const symbols = new RegExp(symbolsStr);
export default {
    keywords: [
        'abort', 'assert', 'bool', 'break', 'case', 'char', 'continue', 'default', 'do', 'double', 'else', 'false', 'float', 'for', 'free', 'goto', 'if', 'int', 'long', 'malloc', 'malloc_block_node', 'malloc_block_stack', 'printf', 'puts', 'return', 'scanf', 'short', 'signed', 'sizeof', 'stack_cnt', 'stack_head', 'struct', 'switch', 'true', 'unsigned', 'void', 'while'
    ],
    operators: [
        '!', '!=', '%', '%=', '&', '&&', '&*&', '&=', '*', '*=', '+', '++', '+=', ',', '-', '--', '-=', '->', '.', '...', '/', '/=', ':', ';', '<', '<<', '<<=', '<=', '=', '==', '>', '>=', '>>', '>>=', '?', '@*/', '^', '^=', '|', '|->', '|=', '||', '~'
    ],
    symbols: symbols,
    tokenizer: {
        initial: [
            { regex: /[_a-zA-Z][\w_]*/, action: { cases: { '@keywords': { "token": "keyword" }, '@default': { "token": "ID" } } } },
            { regex: /[0-9]+/, action: { "token": "number" } },
            { regex: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/, action: { "token": "string" } },
            { regex: /\/\/@\s*requires/, action: { "token": "SL_COMMENT_VF_REQ" } },
            { regex: /\/\*@\s*requires/, action: { "token": "ML_COMMENT_VF_REQ" } },
            { regex: /\/\/@\s*ensures/, action: { "token": "SL_COMMENT_VF_ENS" } },
            { regex: /\/\*@\s*ensures/, action: { "token": "ML_COMMENT_VF_ENS" } },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': { "token": "operator" }, '@default': { "token": "" } } } },
        ],
        whitespace: [
            { regex: /\s+/, action: { "token": "white" } },
            { regex: /\/\*/, action: { "token": "comment", "next": "@comment" } },
            { regex: /\/\/[^\n\r]*/, action: { "token": "comment" } },
            { regex: /#include[^\n\r]*/, action: { "token": "comment" } },
        ],
        comment: [
            { regex: /[^\/\*]+/, action: { "token": "comment" } },
            { regex: /\*\//, action: { "token": "comment", "next": "@pop" } },
            { regex: /[\/\*]/, action: { "token": "comment" } },
        ],
    }
};
//# sourceMappingURL=c-parser-3.monarch.js.map