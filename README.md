# PureDocx - Template for Js

## Features


## Installation
With modules:
~~~
npm install --save puredocx
~~~

## Usage
First, download the input.docx file and place it in the same folder as your JavaScript file.

``` js
const Puredocx = require("puredocx");
var puredocx = new Puredocx(process.env.PUREDOCX_LICENSE_API_KEY)

var substitutions = {
    "title":"hello",
    "summary":"New World",
    "staff":30,
    "company":"mllx"
};

puredocx.render("input.docx",substitutions,"output.docx");
```

## License key
This software package (puredocx) is a commercial product and requires a license code to operate.

To Get a Metered License API Key in for free in the Free Tier, sign up on https://puredocx.com
