const colorInput = document.querySelector('input[type="color"]')

colorInput.addEventListener('change', function () {
  let color = hexToRgb(this.value)
  document.documentElement.style.setProperty('--r', color.r)
  document.documentElement.style.setProperty('--g', color.g)
  document.documentElement.style.setProperty('--b', color.b)
})

let change = false

document.querySelector('header.edit a').addEventListener('click', function (e) {
  if (change === true) {
    let exit = window.confirm('Czy jesteś pewny, że chcesz wyjść? Strona zawiera informacje, które nie zostaną zapisane przy wyjściu')

    if (exit === false) {
      e.preventDefault()
    }
  }
})

document.querySelector('section header form input').addEventListener('change', function (e) {
  document.querySelector('section header form img').src = URL.createObjectURL(e.target.files[0])
  document.querySelector('section header form label').removeAttribute('class')

  if (change === false) {
    change = true
  }
})

const editableElements = document.querySelectorAll('.default')

for (var i = 0; i < editableElements.length; i++) {
  editableElements[i].addEventListener('blur', function () {
    this.classList.remove('default')

    if (change === false) {
      change = true
    }
  })
}

const btnAdditionalInfo = document.querySelectorAll('section > div div.section a.additional')

for (var j = 0; j < btnAdditionalInfo.length; j++) {
  btnAdditionalInfo[j].addEventListener('click', function () {
    this.classList.toggle('open')
    document.querySelector('div#' + this.parentElement.parentElement.id + ' div.section div.additional').classList.toggle('open')
  })
}

for (var l = 0; l < editableElements.length; l++) {
  editableElements[l].addEventListener('keyup', function () {
    let pages = document.querySelectorAll('section')

    for (var i = 0; i < pages.length; i++) {
      if (pages[i].scrollHeight > pages[i].clientHeight || pages[i].scrollWidth > pages[i].clientWidth) {
        let newSection = document.createElement('section')
        let separator = document.createElement('div')
        separator.classList.add('separator')

        document.querySelector('main').appendChild(separator)
        document.querySelector('main').appendChild(newSection)

        if (pages[i + 1] !== undefined) {
          newSection.parentElement.insertBefore(newSection, pages[i + 1])
          separator.parentElement.insertBefore(separator, pages[i + 1])
        }

        newSection.appendChild(pages[i].querySelector(':scope > div:last-of-type'))
      }
    }

    let addDivSections = document.querySelectorAll('section > div > a')

    for (var j = 0; j < pages.length; j++) {
      addDivSections[j].style.top = 'calc(15mm + ' + pages[j].querySelector(':scope > div div.section').getBoundingClientRect().height / 2 + 'px)'
    }
  })
}

function hexToRgb (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}
