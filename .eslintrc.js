module.exports = {
  root: true,
  // 指定脚本的运行环境
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // 指定解析器选项
  parserOptions: {
    parser: 'babel-eslint',
    // 启用ES6语法支持
    ecmaVersion: 2015,
    // module表示ECMAScript模块
    sourceType: 'module'
  },
  plugins: [
    'vue',
    'attributes'
  ],
  // 脚本在执行期间访问的额外的全局变量
  globals: {
    Vue: true,
    VueRouter: true,
    _: true // lodash
  },
  // 启用的规则及其各自的错误级别
  rules: {
    'array-bracket-spacing': 2, // 强制数组方括号中使用一致的空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 生产环境禁止打印
    indent: [2, 2, { SwitchCase: 1 }], // 两个空格缩进
    'brace-style': [2, '1tbs'], // if else 的花括号换行规则
    'block-spacing': 2, // 代码块中开括号前和闭括号后有空格
    eqeqeq: [2, 'always', { null: 'ignore' }], // 必须使用 === 和 !== ，和 null 对比时除外
    'eol-last': 2, // 要求文件末尾存在空行
    'lines-around-comment': 0, // 要求在注释周围有空行
    'no-multiple-empty-lines': [2, { // 禁止出现多行空行
      max: 3, // 文件内最多连续 3 个
      maxEOF: 1, // 文件末尾最多连续 1 个
      maxBOF: 1 // 文件头最多连续 1 个
    }],
    'multiline-ternary': [2, 'always-multiline'], // 如果表达式跨越多个行，则在三元表达式的操作数之间强制换行
    'no-trailing-spaces': [2, { // 禁止行尾空格
      skipBlankLines: true, // 不检查空行
      ignoreComments: true // 不检查注释
    }],
    'key-spacing': 2, // 象键值对值之前留有空格
    camelcase: 0, // 骆峰命名法
    'new-cap': 2, // 构造函数首字母大写
    'spaced-comment': [2, 'always', { // 注释的斜线和星号后要加空格
      block: {
        exceptions: ['*'],
        balanced: true
      }
    }],
    'no-var': 2, // 禁止使用 var，必须用 let 或 const
    'no-unused-vars': [2, // 禁止定义不使用的变量
      {
        vars: 'all', // 变量定义必须被使用
        args: 'none', // 对于函数形参不检测
        ignoreRestSiblings: true, // 忽略剩余子项 fn(...args)，{a, b, ...coords}
        caughtErrors: 'none' // 忽略 catch 语句的参数使用
      }
    ],
    'no-use-before-define': [2, // 禁止在变量被定义之前使用它
      {
        functions: false, // 允许函数在定义之前被调用
        classes: false // 允许类在定义之前被引用
      }
    ],
    'no-undef-init': 2, // 禁止将 undefined 赋值给变量
    'no-undef': 2, // 禁止访问未定义的变量或方法
    'no-sparse-arrays': 2, // 禁止数组中出现连续逗号
    'no-return-assign': 2, // 禁止在return中赋值
    'no-return-await': 2, // 禁止在 return 中使用 await
    'no-redeclare': 2, // 禁止重复声明
    'no-regex-spaces': 2, // 禁止在正则表达式中出现连续空格
    'no-multi-assign': 2, // 禁止连等赋值
    'no-multi-spaces': 2, // 禁止使用连续的空格
    'no-mixed-operators': [2, { // 禁止使用混合的逻辑判断，必须把不同的逻辑用圆括号括起来
      groups: [
        ['&&', '||']
      ]
    }],
    'no-mixed-requires': 2, // 相同类型的 require 必须放在一起
    'no-mixed-spaces-and-tabs': 2, // 禁止混用空格和 tab 来做缩进，必须统一
    'no-lone-blocks': 2, // 禁止使用无效的块作用域
    'no-extra-semi': 2, // 禁止额外的分号
    'no-eval': 2, // 禁止使用 eval
    'no-empty-function': 2, // 禁止空的 function, 包含注释的情况下允许
    'no-empty-pattern': 2, // 禁止解构中出现空 {} 或 []
    'no-empty': [2, { allowEmptyCatch: true }], // 禁止出现空代码块
    'no-dupe-keys': 2, // 禁止对象出现重名键值
    'no-dupe-class-members': 2, // 类方法禁止重名
    'no-duplicate-case': 2, // 禁止 switch 中出现相同的 case\
    'no-duplicate-imports': 2, // 禁止重复 import
    'keyword-spacing': 2, // 关键字前后必须有空格
    'vue/script-indent': ['error', 2, { // script缩进配置
      baseIndent: 0,
      ignores: ['SwitchCase']
    }],
    'vue/html-closing-bracket-newline': ['error', { // html右括号的位置，多行标签换行
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/html-indent': ['error', 2, {
      attribute: 1 // 属性的缩进倍数
    }],
    'vue/html-quotes': ['error', 'double'], // HTML属性的双引号样式
    'vue/max-attributes-per-line': ['error', {
      singleline: 3, // 单行超过3个属性，则换行
      multiline: {
        max: 1 // 多行最多只允许1个属性
      }
    }],
    'vue/multiline-html-element-content-newline': ['error', { // 多行元素的内容之前和之后执行换行
      ignoreWhenEmpty: true,
      allowEmptyLines: false
    }],
    'vue/mustache-interpolation-spacing': ['error', 'always'], // 插值统一间距
    'vue/order-in-components': [0, {
      order: [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'fetch',
        'asyncData',
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        'head',
        ['template', 'render'],
        'renderError'
      ]
    }],
    'vue/space-infix-ops': ['error', { int32Hint: false }], // 缀操作符之间的间距
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // 最多允许的属性数量，单个属性的字符串最大长度
    'attributes/max-attributes': [0, { max: 3, attrStrLimit: 50 }],
    // 属性上'||'和'&&'出现的次数限制
    'attributes/max-attribute-value-logical': [2, { max: 2 }]
  }
}
