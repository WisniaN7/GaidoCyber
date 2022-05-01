window.addEventListener('load', function () {
  const edit = document.querySelectorAll('.edit')
  const textNodes = document.querySelectorAll('h1, h2, p')
  const nodes = document.querySelectorAll('html *')
  const colorInput = document.querySelector('input[type="color"]')

  colorInput.addEventListener('change', function () {
    let color = this.value
    document.documentElement.style.setProperty('--accentColor', color)
  })
})
