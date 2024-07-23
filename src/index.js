// PizZip is required because docx/pptx/xlsx files are all zipped files, and
// the PizZip library allows us to load the file in memory
const PizZip = require("pizzip");
const { setOptions } = require('./common/options.js');
const Docxtemplater = require("./docx-module/docxtemplater");
const ImageModule = require("./image-module");

const fs = require("fs");
var packageJson = require('../package.json');


class Puredocx {
    constructor(opts) {
        var _this = this;
        this._author = packageJson.author.name;
        this._company = 'mllx87';
        this._version = packageJson.version;
        this.options = setOptions(opts);

        var modules = [new ImageModule(this.options.imageOptions)];
        modules.forEach(function (module) {
            _this.options.modules.push(module);
          });

       // console.log("options=>", this.options);
    }
    version() {
        return this._version;
    }
    author() {
        return this._author;
    }
    company() {
        return this._company;
    }

    render(templateFile, data, outputFile) {

        // Load the docx file as binary content
        const content = fs.readFileSync(templateFile, "binary");

        // Unzip the content of the file
        const zip = new PizZip(content);

        // This will parse the template, and will throw an error if the template is
        // invalid, for example, if the template is "{user" (no closing tag)
        const doc = new Docxtemplater(zip, this.options);
       
        doc.render(data);

        // Get the zip document and generate it as a nodebuffer
        const buf = doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });
        // buf is a nodejs Buffer, you can either write it to a
        // file or res.send it with express for example.
        fs.writeFileSync(outputFile, buf);

    }
}
module.exports = Puredocx;
