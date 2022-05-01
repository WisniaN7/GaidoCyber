window.addEventListener('load', function () {
  const edit = document.querySelectorAll('.edit')
  const textNodes = document.querySelectorAll('h1, h2, p')
  const nodes = document.querySelectorAll('html *')
  const colorInput = document.querySelector('input[type="color"]')

  colorInput.addEventListener('change', function () {
    let color = hexToRgb(this.value)
    document.documentElement.style.setProperty('--r', color.r)
    document.documentElement.style.setProperty('--g', color.g)
    document.documentElement.style.setProperty('--b', color.b)
  })

  document.querySelector('header.edit button').addEventListener('click', function () {
    for (var i = 0; i < edit.length; i++) {
      for (var j = 0; j < textNodes.length; j++) {
        textNodes[j].removeAttribute('contenteditable')
      }

      for (var k = 0; k < nodes.length; k++) {
        nodes[k].removeAttribute('style')
      }

      edit[i].remove()
    }

    setTimeout(function () {
      let doc = document.querySelector('html').outerHTML
      download(doc, 'index', 'text/html')
      downloadURI('scripts.js', 'scripts.js')
      downloadURI('style.css', 'style.css')
      downloadURI('Wideo.mp4', 'Wideo.mp4')
      downloadURI('README.txt', 'README.txt')
      downloadURI('Logo.png', 'Logo.png')
    }, 100)
  })

  function download (data, filename, type) {
    var file = new Blob([data], {
      type: type
    })

    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, filename)
    } else { // Others
      var a = document.createElement('a')
      var url = URL.createObjectURL(file)
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      setTimeout(function () {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 0)
    }
  }

  function downloadURI (uri, name) {
    var link = document.createElement('a')
    link.download = name
    link.href = uri
    link.download = ''
    link.click()
  }
})

function hexToRgb (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}
