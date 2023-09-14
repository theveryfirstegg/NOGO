module.exports = {
    singleQuote: true,
    semi: false,
    endOfLine: 'auto',
    printWidth: 80,
    tabWidth: 4,
    plugins: ['@ianvs/prettier-plugin-sort-imports'],
    importOrder: [
        '',
        '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
        '^(expo(.*)$)|^(expo$)',
        '<THIRD_PARTY_MODULES>',
        '',
        '^~(/.*)$',
        '^[.]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
}
