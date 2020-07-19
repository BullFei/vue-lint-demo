## 代码检查工具

[ESLint 小故事](https://segmentfault.com/a/1190000019896962)

[知乎-代码故事](https://zhuanlan.zhihu.com/codestory)

## 代码检查工具是干什么的？

> 用来分析代码中可能会存在的一些错误的

## 前端代码检查工具的发展史

1. jslint
2. jsjlint
3. Eslit（推荐）

## 创建项目

```shell
vue create vue-lint
```

> 选择自定义安装依赖插件（按照项目需求去安装插件）

<img src="/Users/tianyufei/Library/Application Support/typora-user-images/image-20200718004841756.png" alt="image-20200718004841756" style="zoom:50%;" />

## vue 脚手架创建项目时的 linter/formatter 配置选择

1. ESLint with error prevention only

   1. 只配置使用 ESLint 官网的推荐规则
   2. 这些规则在这里 https://eslint.bootcss.com/docs/rules/

2. ESLint + Airbnb config

   1. 配置使用 ESLint 官方推荐的规则 + Airbnb 第三方的配置
   2. Airbnb 的规则在这里 https://github.com/airbnb/javascript

3. ESLint + Standard config（推荐使用这个，最复杂）

   1. 配置使用 ESLint 官方推荐的规则 + Standard config 第三方的配置
   2. Standard config 规则在这里 https://github.com/standard/standard/blob/master/docs/README-zhcn.md

4. ESLint + Prettier

   1. 配置使用 ESLint 官方推荐的规则 + Prettier 第三方的配置
   2. Prettier 主要是做风格统一，代码格式化工具。（可以在 VSCode 安装此插件） https://github.com/prettier/prettier

5. 选择在何时进行代码检查

   <img src="/Users/tianyufei/Library/Application Support/typora-user-images/image-20200718010713244.png" alt="image-20200718010713244" style="zoom:50%;" />

6. 选择配置文件的保存目录

<img src="/Users/tianyufei/Library/Application Support/typora-user-images/image-20200718010806663.png" alt="image-20200718010806663" style="zoom:50%;" />

7. 设置保存的配置名字（方便下次创建项目进行快速配置）

> vue create 创建项目时可以将选择给保留下来，后续创建项目就直接使用之前做的选择。
>
> 保留到哪里了呢？用户主目录下的.vuerc 文件中。

<img src="/Users/tianyufei/Library/Application Support/typora-user-images/image-20200718010915538.png" alt="image-20200718010915538" style="zoom:50%;" />

## 我们 clone 下来的项目怎么查看是哪种配置

配置文件

1. 项目根目录下的 .eslintrc.js
2. .eslintrc.yml
3. eslintrc.json
4. Package.json 中 eslintConfig 配置中写的

## 在 VSCode 设置

> 配合我们选择的 eslint 进行 VSCode 编辑器设置。

## 为了处理一些常见的 ESLint 规则的问题，我们可以做 VSCode 的格式化

1. 可以对 VSCode 自带的一些配置做设置 首选项 -> 设置 -> 搜索 format -> 启动 Format On Save

2. 安装一款 VSCode 的插件，插件名字叫做 Prettier - Code formatter

   1. 启用 VSCode 保存代码时自动格式化，右键【格式化文档】
   2. 在项目中 ESLint 的配置让我们不使用分号，然后 prettier 这个格式化工具自动使用了分号，如何处理一下呢？

   > ##### 在项目中配置 prettier 的配置文件
   >
   > https://prettier.io/ -> configuration file
   >
   > <1> 在 package.json 中配置 prettier 属性
   >
   > <2> .prettierrc 文件
   >
   > <3> .prettierrc.js 或者 .prettierrc.json 文件
   >
   > <4> .prettierrc.toml 文件

3. 根目录新建 .prettierrc.js，在这个文件中做一些配置即可

```javascript
// prettier 的配置文件
module.exports = {
  //不使用分号
  semi: false,
  //设置引号为单引号
  singleQuote: true,
  //去除拖尾逗号
  trailingComma: 'none'
}
```

4.  ESLint 的规则和 prettier 格式化的格式有不同的时候，应该听谁的？

    > 听 ESLint 的。

    5.  修改 prettier 默认的格式的时候，发现找不到相应的配置或者根本没有相应的配置时，如何办？

    > 凉拌，针对这个文件就不要使用 prettier 的格式化操作即可。

    6.  我是团队的老大，目前这个项目使用了 Standard 设置 ESLinit 规则，发现这里面有些我不爽的地方，能否修改呢？

    > 可以修改，只需要在 ESLinit 的配置中配置响应的 rule 即可。注意修改了 ESLint 规则之后，需要重启。

    .eslintrc.js

    ```javascript
    module.exports = {
      root: true,
      env: {
        node: true
      },
      extends: ['plugin:vue/essential', '@vue/standard'],
      parserOptions: {
        parser: 'babel-eslint'
      },
      rules: {
        //自己配置规则
        /*
          process.env.NODE_ENV 环境变量
          本地开发时(npm run serve): process.env.NODE_ENV 值是 development
          构建上线(npm run build):   process.env.NODE_ENV 值是 production
          no-console 是规则名字  代码中不允许使用 console
          no-debugger是规则名字  代码中不允许使用 debugger
    
          规则的值主要是 三种字符串表示
          'off'  关闭规则
          'warn' 启用规则，规则不通过时，会报警告
          'error'启用规则，规则不通过时，会报错误，程序会退出
        */
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
        //将分号规则关闭掉
        // semi: 'off'
      }
    }
    ```

    .prettierrc.js

    ```javascript
    // prettier 的配置文件
    module.exports = {
      //关闭  不使用分号
      // semi: false,
      //设置引号为单引号
      singleQuote: true,
      //去除拖尾逗号
      trailingComma: 'none'
    }
    ```

    7.  在代码中有时一些语法触发了某个规则，但是这个语法必须要这样的时候，如何办呢？

    > eslint 判断必须使用 ===，但是我希望现在使用==号
    >
    > 解决：可以使用 ESLint 特有的注释对这小块代码做一个临时的规则开放。

    ```javascript
    /* eslint-disable*/
    //以下的所有代码就不做代码检查了
    const age = 10
    if (age == '10') {
      console.log('goods')
    }
    ```

    > 更多配置： https://eslint.bootcss.com/docs/user-guide/configuring
