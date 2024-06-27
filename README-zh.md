# PureDocx - Template for Js

[![Download count](https://img.shields.io/npm/dm/puredocx.svg?style=flat)](https://www.npmjs.org/package/puredocx) 
[![Current tag](https://img.shields.io/npm/v/puredocx.svg?style=flat)](https://www.npmjs.org/package/puredocx)

[English](https://github.com/mllx87/puredocx/blob/master/README.md) | 简体中文

[PureDocx](https://puredocx.cn)是一个从docx/xlsx/pptx模板生成docx/xlsx/pptx文档的库。 
它可以用数据替换{placeholders}，还支持循环、条件、添加或替换图像、图表、水印等。

## Word Examples ##
- [Simple Text Replacing](https://github.com/mllx87/puredocx-examples/tree/master/word/simple) Replace a {placeholder} by a value
- [Use loops](https://github.com/mllx87/puredocx-examples/tree/master/word/loop) This tag should use: {#phones} {brand} {/phones}
- [Add image](https://github.com/mllx87/puredocx-examples/tree/master/word/image-create)    This tag should use: {%image}
- [Add chart](https://github.com/mllx87/puredocx-examples/tree/master/word/chart-line) This tag should use: {$chart}
- [Add watermark](https://github.com/mllx87/puredocx-examples/tree/master/word/watermark) This tag should use: {watermark}
## Excel Examples ##
- [Simple Text Replacing](https://github.com/mllx87/puredocx-examples/tree/master/excel/simple) Replace a {placeholder} by a value
- [Use loops](https://github.com/mllx87/puredocx-examples/tree/master/excel/loop) This tag should use: {#phones} {brand} {/phones}
- [Multi sheet](https://github.com/mllx87/puredocx-examples/tree/master/excel/multi-sheet) 
## Powerpoint Examples ##
- [Simple Text Replacing](https://github.com/mllx87/puredocx-examples/tree/master/powerpoint/simple) Replace a {placeholder} by a value
- [Use loops](https://github.com/mllx87/puredocx-examples/tree/master/powerpoint/loop) This tag should use: {#phones} {brand} {/phones}
- [Add image](https://github.com/mllx87/puredocx-examples/tree/master/powerpoint/image-create)    This tag should use: {%image}
- [Add chart](https://github.com/mllx87/puredocx-examples/tree/master/powerpoint/chart-line) This tag should use: {$chart}

更多示例 https://github.com/mllx87/puredocx-examples.

如果您需要任何具体示例，请联系我们。

## Installation

[Puredocx NPM Home](https://www.npmjs.com/package/puredocx)

With modules:
~~~
npm install --save puredocx
~~~

## Usage
First, download the input.docx file and place it in the same folder as your JavaScript file.

``` js
const Puredocx = require("puredocx");

// Make sure to load your metered License API key prior to using the library.
// If you need a key, you can sign up and create a free one at https://puredocx.cn
var puredocx = new Puredocx()

puredocx.setMeteredKey(process.env.PUREDOCX_LICENSE_API_KEY)

var substitutions = {
    "title":"hello",
    "summary":"New World",
    "staff":30,
    "company":"mllx"
};

puredocx.render("input.docx",substitutions,"output.docx")
```

## 注册码
该软件包（puredocx）是商业产品，需要许可证代码才能运行。

要在免费套餐中免费获取计量许可证 API 密钥，请注册 https://puredocx.cn

## 支持和咨询 ##

如有任何疑问，请发送电子邮件至 support@milyleshare.com。

如果您有任何需要完成的特定任务，我们会在某些情况下提供咨询。
请联系我们并简要说明您的需求。
