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
First, download the [simple.docx](https://github.com/mllx87/puredocx/blob/master/tests/simple.docx) file and place it in the same folder as your JavaScript file.

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

Images,Assuming your docx or pptx template contains only the text {%image}

``` js
const Puredocx = require("@mllx87/puredocx");

var puredocx = new Puredocx()

var substitutions = {
    "title":"hello",
    "summary":"New World",
    "staff":30,
    "company":"mllx",
    "image": "99e36.jpeg"
};

puredocx.render("input.docx",substitutions,"output.docx")
```

Some notes regarding templates:
* **docx** files: the placeholder `{%image}` must be in a dedicated paragraph.
* **pptx** files: the placeholder `{%image}` must be in a dedicated text cell.

### Centering images
----------------
You can center all images by setting the global switch to true `opts.imageOptions.centered = true`.

If you would like to choose which images should be centered one by one:
* Set the global switch to false `opts.imageOptions.centered = false`.
* Use `{%image}` for images that shouldn't be centered.
* Use `{%%image}` for images that you would like to see centered.

In **pptx** generated documents, images are centered vertically and horizontally relative to the parent cell.


Supported image format in given data : 
- Base64 string
- Absolute path file
- relative path file (absolute is prior to relative in test)
- URL : https://www.puredocx.com/static/img/company.png

You can pass imageRootPath option for setting the root folder for your images.  
``` js
    var puredocx = new Puredocx({
    "imageOptions": {
        imageRootPath: "/path/to/your/image/dir",
        getSize() { return [350, 300] }
    }
})
```
For more options see:[PureDocx](https://puredocx.com)