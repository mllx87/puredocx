const fs = require("fs");
const sizeOf = require("image-size");
module.exports = {
  modules: [],
  imageOptions: {
    imageRootPath: "",
    getImage(tagValue, tagName, meta) {
      // console.log({ tagValue, tagName, meta });
      if (typeof tagValue === "string") {
        var imagePath = this && this.imageRootPath ? `${this.imageRootPath}/${tagValue}` : tagValue;
        if (fs.existsSync(imagePath)) {
          return fs.readFileSync(imagePath);
        }
        const base64Value = base64Parser(tagValue);
        if (base64Value) {
          return base64Value;
        }
        if (isValidHttpUrl(tagValue)) {
          return new Promise(function (resolve, reject) {
            getHttpData(tagValue, function (err, data) {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
        }
        throw new TypeError(`image type is not supported : ${typeof tagValue}`);
      }
    },
    getSize(img, tagValue, tagName, part) {
      //console.log({ tagValue, tagName, part });
      const sizeObj = sizeOf(img);
      const maxWidth = part.containerWidth;
      const maxHeight = part.containerHeight || part.containerWidth;
      const widthRatio = sizeObj.width / maxWidth;
      const heightRatio = sizeObj.height / maxHeight;
      if (widthRatio < 1 && heightRatio < 1) {
        /*
         * Do not scale up images that are
         * smaller than maxWidth,maxHeight
         */
        return [sizeObj.width, sizeObj.height];
      }
      let finalWidth, finalHeight;
      if (widthRatio > heightRatio) {
        /*
         * Width will be equal to maxWidth
         * because width is the most "limiting"
         */
        finalWidth = maxWidth;
        finalHeight = sizeObj.height / widthRatio;
      } else {
        /*
         * Height will be equal to maxHeight
         * because height is the most "limiting"
         */
        finalHeight = maxHeight;
        finalWidth = sizeObj.width / heightRatio;
      }
      return [Math.round(finalWidth), Math.round(finalHeight)];
    }
  }
};
const base64Regex = /^(?:data:)?image\/(png|jpg|jpeg|svg|svg\+xml);base64,/;
const validBase64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
function base64Parser(dataURL) {
  if (typeof dataURL !== "string" || !base64Regex.test(dataURL)) {
    return false;
  }
  const stringBase64 = dataURL.replace(base64Regex, "");
  if (!validBase64.test(stringBase64)) {
    throw new Error("Error parsing base64 data, your data contains invalid characters");
  }

  // For nodejs, return a Buffer
  if (typeof Buffer !== "undefined" && Buffer.from) {
    return Buffer.from(stringBase64, "base64");
  }

  // For browsers, return a string (of binary content) :
  const binaryString = window.atob(stringBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes.buffer;
}
function isValidHttpUrl(string) {
  try {
    const newUrl = new URL(string);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}
function getHttpData(url, callback) {
  const https = require("https");
  const http = require("http");
  (url.substr(0, 5) === "https" ? https : http).request(url, function (response) {
    if (response.statusCode !== 200) {
      return callback(new Error(`Request to ${url} failed, status code: ${response.statusCode}`));
    }
    const data = new Stream();
    response.on("data", function (chunk) {
      data.push(chunk);
    });
    response.on("end", function () {
      callback(null, data.read());
    });
    response.on("error", function (e) {
      callback(e);
    });
  }).end();
}

// 导出变量
// module.exports = {
//     defaultOptions
// };