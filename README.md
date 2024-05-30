# PureDocx - Template for Js

[PureDocx](https://puredocx.com) is a library that generates docx/xlsx/pptx documents from docx/xlsx/pptx templates. 
It can replace {placeholders} with data, and also supports loops, conditions, adding or replacing images, charts, watermarks, etc.

[![Download count](https://img.shields.io/npm/dm/puredocx.svg?style=flat)](https://www.npmjs.org/package/puredocx) 
[![Current tag](https://img.shields.io/npm/v/puredocx.svg?style=flat)](https://www.npmjs.org/package/puredocx)


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

Multiple examples are provided in our example repository https://github.com/mllx87/puredocx-examples.

Contact us if you need any specific examples.

## Installation
With modules:
~~~
npm install --save puredocx
~~~

## Usage
First, download the input.docx file and place it in the same folder as your JavaScript file.

``` js
const Puredocx = require("puredocx");

// Make sure to load your metered License API key prior to using the library.
// If you need a key, you can sign up and create a free one at https://puredocx.com
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

## License key
This software package (puredocx) is a commercial product and requires a license code to operate.

To Get a Metered License API Key in for free in the Free Tier, sign up on https://puredocx.com

## Support and consulting ##

Please email us at support@milyleshare.com for any queries.

If you have any specific tasks that need to be done, we offer consulting in certain cases.
Please contact us with a brief summary of what you need.
