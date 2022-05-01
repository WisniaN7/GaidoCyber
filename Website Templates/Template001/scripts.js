window.addEventListener('load', function () {
  const button = document.querySelector('section button')
  const span = document.querySelectorAll('span:not(.hand)')
  let rotation = 0

  document.querySelector('video').play()

  for (var i = 0; i < span.length; i++) {
    span[i].style.transform = 'rotate(' + rotation + 'deg)'
    rotation += 30
  }

  button.addEventListener('click', function () {
    document.querySelector('section:nth-of-type(2)').scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })

    this.classList.add('hidden')
  })

  window.addEventListener('scroll', function () {
    let distanceToTop = document.querySelector('section:nth-of-type(2)').getBoundingClientRect().top

    if (distanceToTop > window.innerHeight * 0.9) {
      button.removeAttribute('class')
    } else {
      button.classList.add('hidden')
    }
  })
})
