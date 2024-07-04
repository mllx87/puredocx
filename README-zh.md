# PureDocx - Template for Js

[![Current tag](https://img.shields.io/npm/v/@mllx87/puredocx.svg?style=flat)](https://www.npmjs.com/package/@mllx87/puredocx)

[English](https://github.com/mllx87/puredocx/blob/master/README.md) | 简体中文

[PureDocx](https://puredocx.cn)是一个从docx/xlsx/pptx模板生成docx/xlsx/pptx文档的库。基于docxtemplater二次开发， 
它可以用数据替换{placeholders}，还支持循环、条件、添加或替换图像、图表、水印等。

## Word Examples ##
- [Simple Text Replacing](https://github.com/mllx87/puredocx-examples/tree/master/word/simple) Replace a {placeholder} by a value
- [Use loops](https://github.com/mllx87/puredocx-examples/tree/master/word/loop) This tag should use: {#phones} {brand} {/phones}

## Powerpoint Examples ##
- [Simple Text Replacing](https://github.com/mllx87/puredocx-examples/tree/master/powerpoint/simple) Replace a {placeholder} by a value
- [Use loops](https://github.com/mllx87/puredocx-examples/tree/master/powerpoint/loop) This tag should use: {#phones} {brand} {/phones}


更多示例 https://github.com/mllx87/puredocx-examples.

如果您需要任何具体示例，请联系我们。

## Installation

[Puredocx NPM Home](https://www.npmjs.com/package/@mllx87/puredocx)

With modules:
~~~
npm install --save @mllx87/puredocx
~~~

## Usage
First, download the input.docx file and place it in the same folder as your JavaScript file.

``` js
const Puredocx = require("@mllx87/puredocx");


var puredocx = new Puredocx()



var substitutions = {
    "title":"hello",
    "summary":"New World",
    "staff":30,
    "company":"mllx"
};

puredocx.render("input.docx",substitutions,"output.docx")
```

