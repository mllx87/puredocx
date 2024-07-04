# PureDocx - Template for Js

[![Current tag](https://img.shields.io/npm/v/@mllx87/puredocx.svg?style=flat)](https://www.npmjs.com/package/@mllx87/puredocx)

English | [简体中文](https://github.com/mllx87/puredocx/blob/master/README-zh.md)

[PureDocx](https://puredocx.com) is a library that generates docx/xlsx/pptx documents from docx/xlsx/pptx templates. Based on the secondary development of docxtemplater, it can replace {placeholders} with data, and also supports loops, conditions, adding or replacing images, charts, watermarks, etc.

## Word Examples ##
- [Simple Text Replacing](https://github.com/mllx87/puredocx-examples/tree/master/word/simple) Replace a {placeholder} by a value
- [Use loops](https://github.com/mllx87/puredocx-examples/tree/master/word/loop) This tag should use: {#phones} {brand} {/phones}

## Powerpoint Examples ##
- [Simple Text Replacing](https://github.com/mllx87/puredocx-examples/tree/master/powerpoint/simple) Replace a {placeholder} by a value
- [Use loops](https://github.com/mllx87/puredocx-examples/tree/master/powerpoint/loop) This tag should use: {#phones} {brand} {/phones}

Multiple examples are provided in our example repository https://github.com/mllx87/puredocx-examples.

Contact us if you need any specific examples.

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

