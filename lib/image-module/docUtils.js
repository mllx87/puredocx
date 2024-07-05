"use strict";

var DocUtils = require("../docx-module/docxtemplater").DocUtils;
DocUtils.convertPixelsToEmus = function (pixel) {
  return Math.round(pixel * 9525);
};
module.exports = DocUtils;