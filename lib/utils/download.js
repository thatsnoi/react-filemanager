'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerHiddenForm = exports.promptToSaveBlob = undefined;

var _fileSaver = require('file-saver');

var _fileSaver3 = _interopRequireDefault(_fileSaver);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// a case when we need to silently download a file using Javascript, and prompt to save it afterwards
function promptToSaveBlob(_ref) {
  var content = _ref.content,
      name = _ref.name,
      downloadUrl = _ref.downloadUrl;

  if (downloadUrl) {
    (0, _nodeFetch2.default)(downloadUrl, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(function (response) {
      response.blob().then(function (blob) {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
    });
  } else {
    var blob = new Blob([content], { type: 'octet/stream' });
    _fileSaver2.default.saveAs(blob, name);
  }
}

// a case when we trigger a direct download in browser
// used in google drive' connector
function triggerHiddenForm(_ref2) {
  var downloadUrl = _ref2.downloadUrl,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? '_self' : _ref2$target;

  var form = document.createElement('form');
  form.action = downloadUrl;
  form.target = target;
  form.method = 'GET';

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

exports.promptToSaveBlob = promptToSaveBlob;
exports.triggerHiddenForm = triggerHiddenForm;