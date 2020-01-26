"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var getCapabilitiesForResource = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options, resource) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", resource.capabilities || []);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCapabilitiesForResource(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getResourceById = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options, id) {
    var route, method, requestOptions, response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            route = options.apiRoot + "/files/" + id;
            method = "GET";
            requestOptions = setupRequestOptions(options);
            _context2.next = 5;
            return (0, _superagent2.default)(method, route).set(requestOptions.header).query(requestOptions.parameters);

          case 5:
            response = _context2.sent;
            return _context2.abrupt("return", (0, _common.normalizeResource)(response.body));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getResourceById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getChildrenForId = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(options, _ref4) {
    var id = _ref4.id,
        _ref4$sortBy = _ref4.sortBy,
        sortBy = _ref4$sortBy === undefined ? "name" : _ref4$sortBy,
        _ref4$sortDirection = _ref4.sortDirection,
        sortDirection = _ref4$sortDirection === undefined ? "ASC" : _ref4$sortDirection;
    var requestOptions, route, method, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            requestOptions = setupRequestOptions(options);
            route = options.apiRoot + "/files/" + id + "/children?orderBy=" + sortBy + "&orderDirection=" + sortDirection;
            method = "GET";
            _context3.next = 5;
            return (0, _superagent2.default)(method, route).set(requestOptions.header).query(requestOptions.parameters);

          case 5:
            response = _context3.sent;
            return _context3.abrupt("return", response.body.items.map(_common.normalizeResource));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getChildrenForId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getParentsForId = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(options, id) {
    var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var resource, parentId, parent;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (id) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", result);

          case 2:
            _context4.next = 4;
            return getResourceById(options, id);

          case 4:
            resource = _context4.sent;

            if (resource) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", result);

          case 7:
            parentId = resource.parentId;

            if (parentId) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", result);

          case 10:
            _context4.next = 12;
            return getResourceById(options, parentId);

          case 12:
            parent = _context4.sent;
            return _context4.abrupt("return", getParentsForId(options, resource.parentId, [parent].concat((0, _toConsumableArray3.default)(result))));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getParentsForId(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

var getBaseResource = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(options) {
    var route, requestOptions, response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            route = options.apiRoot + "/files";
            requestOptions = setupRequestOptions(options);
            _context5.next = 4;
            return _superagent2.default.get(route).set(requestOptions.header).query(requestOptions.parameters);

          case 4:
            response = _context5.sent;
            return _context5.abrupt("return", (0, _common.normalizeResource)(response.body));

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getBaseResource(_x10) {
    return _ref6.apply(this, arguments);
  };
}();

var getIdForPartPath = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(options, currId, pathArr) {
    var resourceChildren, i, resource;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getChildrenForId(options, { id: currId });

          case 2:
            resourceChildren = _context6.sent;
            i = 0;

          case 4:
            if (!(i < resourceChildren.length)) {
              _context6.next = 15;
              break;
            }

            resource = resourceChildren[i];

            if (!(resource.name === pathArr[0])) {
              _context6.next = 12;
              break;
            }

            if (!(pathArr.length === 1)) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", resource.id);

          case 11:
            return _context6.abrupt("return", getIdForPartPath(options, resource.id, pathArr.slice(1)));

          case 12:
            i++;
            _context6.next = 4;
            break;

          case 15:
            return _context6.abrupt("return", null);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getIdForPartPath(_x11, _x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

var getIdForPath = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(options, path) {
    var resource, pathArr;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getBaseResource(options);

          case 2:
            resource = _context7.sent;
            pathArr = path.split("/");

            if (!(pathArr.length === 0 || pathArr.length === 1 || pathArr[0] !== "")) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", null);

          case 6:
            if (!(pathArr.length === 2 && pathArr[1] === "")) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("return", resource.id);

          case 8:
            return _context7.abrupt("return", getIdForPartPath(options, resource.id, pathArr.slice(1)));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getIdForPath(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

var getParentIdForResource = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(options, resource) {
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", resource.parentId);

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getParentIdForResource(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();

var uploadFileToId = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref11) {
    var apiOptions = _ref11.apiOptions,
        parentId = _ref11.parentId,
        file = _ref11.file,
        onProgress = _ref11.onProgress;
    var route, requestOptions;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            route = apiOptions.apiRoot + "/files";
            requestOptions = setupRequestOptions(apiOptions);
            return _context9.abrupt("return", _superagent2.default.post(route).field("type", "file").field("parentId", parentId).attach("files", file.file, file.name).set(requestOptions.header).query(requestOptions.parameters).on("progress", function (event) {
              onProgress(event.percent);
            }));

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function uploadFileToId(_x18) {
    return _ref10.apply(this, arguments);
  };
}();

var downloadResources = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(_ref13) {
    var apiOptions = _ref13.apiOptions,
        resources = _ref13.resources,
        onProgress = _ref13.onProgress;
    var downloadUrl, requestOptions, res;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            downloadUrl = resources.reduce(function (url, resource, num) {
              return url + (num === 0 ? "" : "&") + ("items=" + resource.id);
            }, apiOptions.apiRoot + "/download?");
            requestOptions = setupRequestOptions(apiOptions);
            _context10.next = 4;
            return _superagent2.default.get(downloadUrl).set(requestOptions.header).query(requestOptions.parameters).responseType("blob").on("progress", function (event) {
              onProgress(event.percent);
            });

          case 4:
            res = _context10.sent;
            return _context10.abrupt("return", res.body);

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function downloadResources(_x19) {
    return _ref12.apply(this, arguments);
  };
}();

var createFolder = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(options, parentId, folderName) {
    var route, method, params, requestOptions;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            route = options.apiRoot + "/files";
            method = "POST";
            params = {
              parentId: parentId,
              name: folderName,
              type: "dir"
            };
            requestOptions = setupRequestOptions(options);
            return _context11.abrupt("return", (0, _superagent2.default)(method, route).send(params).set(requestOptions.header).query(requestOptions.parameters));

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function createFolder(_x20, _x21, _x22) {
    return _ref14.apply(this, arguments);
  };
}();

var renameResource = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(options, id, newName) {
    var route, method, requestOptions;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            route = options.apiRoot + "/files/" + id;
            method = "PATCH";
            requestOptions = setupRequestOptions(options);
            return _context12.abrupt("return", (0, _superagent2.default)(method, route).type("application/json").send({ name: newName }).set(requestOptions.header).query(requestOptions.parameters));

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function renameResource(_x23, _x24, _x25) {
    return _ref15.apply(this, arguments);
  };
}();

var removeResource = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(options, resource) {
    var route, method, requestOptions;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            route = options.apiRoot + "/files/" + resource.id;
            method = "DELETE";
            requestOptions = setupRequestOptions(options);
            return _context13.abrupt("return", (0, _superagent2.default)(method, route).set(requestOptions.header).query(requestOptions.parameters));

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function removeResource(_x26, _x27) {
    return _ref16.apply(this, arguments);
  };
}();

var removeResources = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(options, selectedResources) {
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            return _context14.abrupt("return", Promise.all(selectedResources.map(function (resource) {
              return removeResource(options, resource);
            })));

          case 1:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function removeResources(_x28, _x29) {
    return _ref17.apply(this, arguments);
  };
}();

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

var _common = require("./utils/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * hasSignedIn
 *
 * @returns {boolean}
 */
function hasSignedIn() {
  return true;
}

/**
 * Init API
 *
 * @returns {Promise<{apiInitialized: boolean, apiSignedIn: boolean}>}
 */
function init() {
  return {
    apiInitialized: true,
    apiSignedIn: true
  };
}

function setupRequestOptions(options) {
  var newOptions = (0, _extends3.default)({}, options);

  if (!newOptions.header) {
    newOptions.header = {};
  }

  if (!newOptions.parameters) {
    newOptions.parameters = {};
  }

  return newOptions;
}

function getResourceName(apiOptions, resource) {
  return resource.name;
}

exports.default = {
  init: init,
  hasSignedIn: hasSignedIn,
  getIdForPath: getIdForPath,
  getResourceById: getResourceById,
  getCapabilitiesForResource: getCapabilitiesForResource,
  getChildrenForId: getChildrenForId,
  getParentsForId: getParentsForId,
  getParentIdForResource: getParentIdForResource,
  getResourceName: getResourceName,
  createFolder: createFolder,
  downloadResources: downloadResources,
  renameResource: renameResource,
  removeResources: removeResources,
  uploadFileToId: uploadFileToId
};