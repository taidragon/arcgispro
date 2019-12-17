module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['warn', {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'default-case': 'error', // switch必须default结尾
    'no-alert': 'error', // 不能有alert
    'no-var': 'error', // 不能使用var，只能使用let和const
    'prefer-arrow-callback': ['error', {'allowUnboundThis': false}], // 必须使用箭头函数作为回调函数
    'camelcase': 'error' // 强制进行驼峰命名
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
