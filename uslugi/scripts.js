window.onload = function () {
  let item = document.querySelectorAll('li')
  let index = 0

  for (var i = 0; i < item.length; i++) {
    setTimeout(function () {
      item[index].style.animation = 'slideInLeft 750ms ease-out forwards'
      index++
    }, i * 100)
  }
}
