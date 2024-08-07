"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _require = require("./doc-utils.js"),
  getRightOrNull = _require.getRightOrNull,
  getRight = _require.getRight,
  getLeft = _require.getLeft,
  getLeftOrNull = _require.getLeftOrNull,
  chunkBy = _require.chunkBy,
  isTagStart = _require.isTagStart,
  isTagEnd = _require.isTagEnd,
  isContent = _require.isContent,
  last = _require.last,
  first = _require.first;
var _require2 = require("./errors.js"),
  XTTemplateError = _require2.XTTemplateError,
  throwExpandNotFound = _require2.throwExpandNotFound,
  getLoopPositionProducesInvalidXMLError = _require2.getLoopPositionProducesInvalidXMLError;
function lastTagIsOpenTag(tags, tag) {
  if (tags.length === 0) {
    return false;
  }
  var innerLastTag = last(tags).substr(1);
  return innerLastTag.indexOf(tag) === 0;
}
function getListXmlElements(parts) {
  /*
  Gets the list of closing and opening tags between two texts. It doesn't take
  into account tags that are opened then closed. Those that are closed then
  opened are kept
  	Example input :
  	[
  	{
  		"type": "placeholder",
  		"value": "table1",
  		...
  	},
  	{
  		"type": "placeholder",
  		"value": "t1data1",
  	},
  	{
  		"type": "tag",
  		"position": "end",
  		"text": true,
  		"value": "</w:t>",
  		"tag": "w:t",
  		"lIndex": 112
  	},
  	{
  		"type": "tag",
  		"value": "</w:r>",
  	},
  	{
  		"type": "tag",
  		"value": "</w:p>",
  	},
  	{
  		"type": "tag",
  		"value": "</w:tc>",
  	},
  	{
  		"type": "tag",
  		"value": "<w:tc>",
  	},
  	{
  		"type": "content",
  		"value": "<w:tcPr><w:tcW w:w="2444" w:type="dxa"/><w:tcBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/></w:tcBorders><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/></w:tcPr>",
  	},
  	...
  	{
  		"type": "tag",
  		"value": "<w:r>",
  	},
  	{
  		"type": "tag",
  		"value": "<w:t xml:space="preserve">",
  	},
  	{
  		"type": "placeholder",
  		"value": "t1data4",
  	}
  ]
  	returns
  	[
  		{
  			"tag": "</w:t>",
  		},
  		{
  			"tag": "</w:r>",
  		},
  		{
  			"tag": "</w:p>",
  		},
  		{
  			"tag": "</w:tc>",
  		},
  		{
  			"tag": "<w:tc>",
  		},
  		{
  			"tag": "<w:p>",
  		},
  		{
  			"tag": "<w:r>",
  		},
  		{
  			"tag": "<w:t>",
  		},
  	]
  */

  var result = [];
  for (var i = 0; i < parts.length; i++) {
    var _parts$i = parts[i],
      position = _parts$i.position,
      value = _parts$i.value,
      tag = _parts$i.tag;
    // Stryker disable all : because removing this condition would also work but we want to make the API future proof
    if (!tag) {
      continue;
    }
    // Stryker restore all
    if (position === "end") {
      if (lastTagIsOpenTag(result, tag)) {
        result.pop();
      } else {
        result.push(value);
      }
    } else if (position === "start") {
      result.push(value);
    }
    // ignore position === "selfclosing"
  }
  return result;
}
function has(name, xmlElements) {
  for (var i = 0; i < xmlElements.length; i++) {
    var xmlElement = xmlElements[i];
    if (xmlElement.indexOf("<".concat(name)) === 0) {
      return true;
    }
  }
  return false;
}
function getExpandToDefault(postparsed, pair, expandTags) {
  var parts = postparsed.slice(pair[0].offset, pair[1].offset);
  var xmlElements = getListXmlElements(parts);
  var closingTagCount = xmlElements.filter(function (tag) {
    return tag[1] === "/";
  }).length;
  var startingTagCount = xmlElements.filter(function (tag) {
    return tag[1] !== "/" && tag[tag.length - 2] !== "/";
  }).length;
  if (closingTagCount !== startingTagCount) {
    return {
      error: getLoopPositionProducesInvalidXMLError({
        tag: first(pair).part.value,
        offset: [first(pair).part.offset, last(pair).part.offset]
      })
    };
  }
  var _loop = function _loop() {
      var _expandTags$i = expandTags[i],
        contains = _expandTags$i.contains,
        expand = _expandTags$i.expand,
        onlyTextInTag = _expandTags$i.onlyTextInTag;
      if (has(contains, xmlElements)) {
        if (onlyTextInTag) {
          var left = getLeftOrNull(postparsed, contains, pair[0].offset);
          var right = getRightOrNull(postparsed, contains, pair[1].offset);
          if (left === null || right === null) {
            return 0; // continue
          }
          var chunks = chunkBy(postparsed.slice(left, right), function (p) {
            return isTagStart(contains, p) ? "start" : isTagEnd(contains, p) ? "end" : null;
          });
          var firstChunk = first(chunks);
          var lastChunk = last(chunks);
          var firstContent = firstChunk.filter(isContent);
          var lastContent = lastChunk.filter(isContent);
          if (firstContent.length !== 1 || lastContent.length !== 1) {
            return 0; // continue
          }
        }
        return {
          v: {
            value: expand
          }
        };
      }
    },
    _ret;
  for (var i = 0, len = expandTags.length; i < len; i++) {
    _ret = _loop();
    if (_ret === 0) continue;
    if (_ret) return _ret.v;
  }
  return {};
}
function getExpandLimit(part, index, postparsed, options) {
  var expandTo = part.expandTo || options.expandTo;
  // Stryker disable all : because this condition can be removed in v4 (the only usage was the image module before version 3.12.3 of the image module
  if (!expandTo) {
    return;
  }
  // Stryker restore all
  var right, left;
  try {
    left = getLeft(postparsed, expandTo, index);
    right = getRight(postparsed, expandTo, index);
  } catch (rootError) {
    if (rootError instanceof XTTemplateError) {
      throwExpandNotFound(_objectSpread({
        part: part,
        rootError: rootError,
        postparsed: postparsed,
        expandTo: expandTo,
        index: index
      }, options.error));
    }
    throw rootError;
  }
  return [left, right];
}
function expandOne(_ref, part, postparsed, options) {
  var _ref2 = _slicedToArray(_ref, 2),
    left = _ref2[0],
    right = _ref2[1];
  var index = postparsed.indexOf(part);
  var leftParts = postparsed.slice(left, index);
  var rightParts = postparsed.slice(index + 1, right + 1);
  var inner = options.getInner({
    postparse: options.postparse,
    index: index,
    part: part,
    leftParts: leftParts,
    rightParts: rightParts,
    left: left,
    right: right,
    postparsed: postparsed
  });
  if (!inner.length) {
    inner.expanded = [leftParts, rightParts];
    inner = [inner];
  }
  return {
    left: left,
    right: right,
    inner: inner
  };
}
function expandToOne(postparsed, options) {
  var errors = [];
  if (postparsed.errors) {
    errors = postparsed.errors;
    postparsed = postparsed.postparsed;
  }
  var limits = [];
  for (var i = 0, len = postparsed.length; i < len; i++) {
    var part = postparsed[i];
    if (part.type === "placeholder" && part.module === options.moduleName &&
    // The part.subparsed check is used to fix this github issue :
    // https://github.com/open-xml-templating/docxtemplater/issues/671
    !part.subparsed) {
      try {
        var limit = getExpandLimit(part, i, postparsed, options);
        if (!limit) {
          continue;
        }
        var _limit = _slicedToArray(limit, 2),
          left = _limit[0],
          right = _limit[1];
        limits.push({
          left: left,
          right: right,
          part: part,
          i: i,
          leftPart: postparsed[left],
          rightPart: postparsed[right]
        });
      } catch (error) {
        if (error instanceof XTTemplateError) {
          errors.push(error);
        } else {
          throw error;
        }
      }
    }
  }
  limits.sort(function (l1, l2) {
    if (l1.left === l2.left) {
      return l2.part.lIndex < l1.part.lIndex ? 1 : -1;
    }
    return l2.left < l1.left ? 1 : -1;
  });
  var maxRight = -1;
  var offset = 0;
  limits.forEach(function (limit, i) {
    var _postparsed;
    maxRight = Math.max(maxRight, i > 0 ? limits[i - 1].right : 0);
    if (limit.left < maxRight) {
      return;
    }
    var result;
    try {
      result = expandOne([limit.left + offset, limit.right + offset], limit.part, postparsed, options);
    } catch (error) {
      if (error instanceof XTTemplateError) {
        errors.push(error);
      } else {
        throw error;
      }
    }
    if (!result) {
      return;
    }
    offset += result.inner.length - (result.right + 1 - result.left);
    (_postparsed = postparsed).splice.apply(_postparsed, [result.left, result.right + 1 - result.left].concat(_toConsumableArray(result.inner)));
  });
  return {
    postparsed: postparsed,
    errors: errors
  };
}
module.exports = {
  expandToOne: expandToOne,
  getExpandToDefault: getExpandToDefault
};