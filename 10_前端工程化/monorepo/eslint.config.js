export default {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'vue'],
    rules: {
        // 自定义规则
        'no-var': true // 禁止使用 var 声明变量
    }
}
