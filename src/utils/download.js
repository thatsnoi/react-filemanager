import FileSaver from 'file-saver'
import fetch from 'node-fetch'

// a case when we need to silently download a file using Javascript, and prompt to save it afterwards
function promptToSaveBlob(_ref) {
  var content = _ref.content,
    name = _ref.name,
    downloadUrl = _ref.downloadUrl

  if (downloadUrl) {
    fetch(downloadUrl, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = name
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      })
    })
  } else {
    var blob = new Blob([content], { type: 'octet/stream' })
    _fileSaver2.default.saveAs(blob, name)
  }
}

// a case when we trigger a direct download in browser
// used in google drive' connector
function triggerHiddenForm({ downloadUrl, target = '_self' }) {
  const form = document.createElement('form')
  form.action = downloadUrl
  form.target = target
  form.method = 'GET'

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

export { promptToSaveBlob, triggerHiddenForm }
