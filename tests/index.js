const Puredocx = require("../lib/index.js");


var puredocx = new Puredocx({
    "test": "kkk",
    "imageOptions": {
        imageRootPath: "",
        getSize() { return [350, 300] }
    }
})


var substitutions = {
    "title": "hello",
    "summary": "New World",
    "staff": 30,
    "company": "mllx87",
    "image": "99e36.jpeg"
};


puredocx.render("input.docx", substitutions, "output.docx")
