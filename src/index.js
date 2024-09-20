// PizZip is required because docx/pptx/xlsx files are all zipped files, and
// the PizZip library allows us to load the file in memory
const PizZip = require("pizzip");
const { setOptions, getOptions } = require('./common/options.js');
const Docxtemplater = require("./docx-module/docxtemplater");
const ImageModule = require("./image-module");

const fs = require("fs");
var packageJson = require('../package.json');


class Puredocx {
    constructor() {
        var opts = null;
        this._author = packageJson.author.name;
        this._company = 'mllx87';
        this._version = packageJson.version;
        this._md5 = packageJson.md5;

        if (arguments.length == 0) {
            opts = {};
            this.options = getOptions()
            this.options.modules.push(new ImageModule(this.options.imageOptions));
        } else if (arguments.length == 1) {
            opts = arguments[0] !== undefined ? arguments[0] : {}
            this.options = setOptions(opts);
            this.options.modules.push(new ImageModule(this.options.imageOptions));
        } else {
            var pure = arguments[0];
            if (!pure || !pure.attach || typeof pure.attach !== "function") {
                throw new Error("The first argument of puredocx's constructor must be puredocx-pro-module");
            }
            opts = arguments[1] !== undefined ? arguments[1] : {}

            this.options = setOptions(opts);

            this.options.modules = pure.attach(this.options)

            this.pure = pure
        }
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
    setMeteredKey(meteredKey) {
        this.meteredKey = meteredKey;
    }
    setLicenseKey(license) {
        this.license = license;
    }
    getDeviceId() {
        const machineId = require('node-machine-id');

        const deviceId = machineId.machineIdSync({ original: true })
        return deviceId;
    }

    // render(templateFile, data, outputFile) {

    //     // Load the docx file as binary content
    //     const content = fs.readFileSync(templateFile, "binary");

    //     // Unzip the content of the file
    //     const zip = new PizZip(content);

    //     // This will parse the template, and will throw an error if the template is
    //     // invalid, for example, if the template is "{user" (no closing tag)
    //     const doc = new Docxtemplater(zip, this.options);

    //     doc.render(data);

    //     // Get the zip document and generate it as a nodebuffer
    //     const buf = doc.getZip().generate({
    //         type: "nodebuffer",
    //         // compression: DEFLATE adds a compression step.
    //         // For a 50MB output document, expect 500ms additional CPU time
    //         compression: "DEFLATE",
    //     });
    //     // buf is a nodejs Buffer, you can either write it to a
    //     // file or res.send it with express for example.
    //     fs.writeFileSync(outputFile, buf);
    // }

    async renderAsync(templateFile, data, outputFile) {
        // Load the docx file as binary content
        const content = fs.readFileSync(templateFile, "binary");

        // Unzip the content of the file
        const zip = new PizZip(content);

        //
        if (this.pure !== undefined && this.meteredKey !== undefined) {
            await this.pure.checkApiKey(this)
        }

        if (this.pure !== undefined && this.license !== undefined) {
            await this.pure.checkLicense(this)
        }
        // This will parse the template, and will throw an error if the template is
        // invalid, for example, if the template is "{user" (no closing tag)
        const doc = new Docxtemplater(zip, this.options);

        await doc.renderAsync(data);

        if (this.pure !== undefined) {
            await this.pure.notify()
        }
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
