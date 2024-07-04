const Puredocx = require("../index.js");


var puredocx = new Puredocx()


var substitutions = {
    "title": "hello",
    "summary": "New World",
    "staff": 30,
    "company": "mllx87"
};


puredocx.render("simple.docx", substitutions, "output.docx")