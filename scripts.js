window.addEventListener('load', function () {
  window.mobileAndTabletcheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  function isInViewport (elem) {
    var bounding = elem.getBoundingClientRect()
    return (
      bounding.top >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  function detectMouseWheelDirection (e) {
    let delta = null
    let direction = false
    if (!e) { // if the event is not provided, we get direction from the window object
      e = window.event
    }
    if (e.wheelDelta) { // will work in most cases
      delta = e.wheelDelta / 60
    } else if (e.detail) { // fallback for Firefox
      delta = -e.detail / 2
    }
    if (delta !== null) {
      direction = delta > 0 ? 'up' : 'down'
    }

    return direction
  }

  const header = document.querySelector('header')

  header.querySelector('div').addEventListener('click', function () {
    header.classList.toggle('open')
  })

  const serviceTiles = document.querySelectorAll('#services div.tiles a')
  const serviceLists = document.querySelectorAll('#services div.lists ul')

  let canOpenList = true
  let listIsOpen = false

  let tempText
  let tempNode

  for (var i = 0; i < serviceTiles.length; i++) {
    serviceTiles[i].addEventListener('click', function (e) {
      e.preventDefault()
      const openList = document.querySelector('#' + this.getAttribute('href'))

      if (window.mobileAndTabletcheck()) {
        openList.classList.add('visible')
        openList.parentElement.style.display = 'block'
      } else {
        if (canOpenList === true) {
          canOpenList = false

          if (!listIsOpen) {
            listIsOpen = true

            openList.classList.add('visible')
            this.parentElement.classList.add('visible-list')

            for (var i = 0; i < serviceTiles.length; i++) {
              serviceTiles[i].classList.add('blur')
            }

            this.removeAttribute('class')

            tempText = this.querySelector('h3').innerText
            tempNode = this.querySelector('h3')
            this.querySelector('h3').innerText = 'Kliknij, aby zamknąć'

            setTimeout(function () {
              canOpenList = true
            }, 500)
          } else {
            if (openList.classList.contains('visible')) {
              this.parentElement.classList.remove('visible-list')

              tempNode.innerText = tempText

              for (var j = 0; j < serviceTiles.length; j++) {
                serviceTiles[j].removeAttribute('class')
              }

              setTimeout(function () {
                openList.classList.remove('visible')
                canOpenList = true
                listIsOpen = false
              }, 500)
            } else {
              this.parentElement.classList.remove('visible-list')
              tempNode.innerText = tempText

              for (var k = 0; k < serviceTiles.length; k++) {
                serviceTiles[k].classList.add('blur')
              }

              this.removeAttribute('class')

              setTimeout(() => {
                this.parentElement.classList.add('visible-list')

                tempText = this.querySelector('h3').innerHTML
                tempNode = this.querySelector('h3')
                this.querySelector('h3').innerHTML = 'Kliknij, aby zamknąć'

                for (var i = 0; i < serviceLists.length; i++) {
                  serviceLists[i].classList.remove('visible')
                }

                openList.classList.add('visible')
              }, 500)

              setTimeout(function () {
                canOpenList = true
              }, 1000)
            }
          }
        }
      }
    })
  }

  for (var j = 0; j < serviceLists.length; j++) {
    serviceLists[j].querySelector('li').addEventListener('click', function () {
      this.parentElement.classList.remove('visible')

      setTimeout(() => {
        this.parentElement.parentElement.style.display = 'none'
      }, 500)
    })
  }

  const partners = document.querySelectorAll('#other div.partners > div a')

  for (var k = 0; k < partners.length; k++) {
    partners[k].querySelector('span').addEventListener('click', function (e) {
      e.preventDefault()

      if (this.parentElement.classList.contains('full-description')) {
        this.innerHTML = 'Czytaj więcej'

        for (var i = 0; i < partners.length; i++) {
          partners[i].removeAttribute('class')
        }
      } else {
        this.innerHTML = 'Zamknij'

        for (var j = 0; j < partners.length; j++) {
          partners[j].classList.add('hidden')
        }

        this.parentElement.classList.remove('hidden')
        this.parentElement.classList.add('full-description')
      }
    })
  }

  const sections = document.querySelectorAll('section')
  let currentSection
  let allowScrolling = true

  for (var l = 0; l < sections.length; l++) {
    let section = sections[l]
    let previousSection = sections[l - 1]
    let nextSection = sections[l + 1]

    if (section.querySelector('div.arrow.up')) {
      section.querySelector('div.arrow.up').addEventListener('click', function () {
        currentSection--

        previousSection.scrollIntoView({
          behavior: 'smooth',
          alignToTop: true
        })
      })
    }

    if (section.querySelector('div.arrow.down')) {
      section.querySelector('div.arrow.down').addEventListener('click', function () {
        currentSection++

        nextSection.scrollIntoView({
          behavior: 'smooth',
          alignToTop: true
        })
      })
    }

    // Onload check which section is in viewport
    if (isInViewport(sections[l])) {
      currentSection = l
    }
  }

  window.addEventListener('mousewheel', function (e) {
    if (allowScrolling === true) {
      allowScrolling = false

      if (detectMouseWheelDirection(e) === 'up' && currentSection !== 0) {
        currentSection--

        sections[currentSection].scrollIntoView({
          behavior: 'smooth',
          alignToTop: true
        })
      } else if (detectMouseWheelDirection(e) === 'down' && currentSection !== 4) {
        currentSection++

        sections[currentSection].scrollIntoView({
          behavior: 'smooth',
          alignToTop: true
        })
      }

      setTimeout(function () {
        allowScrolling = true
      }, 500)
    }
  })

  const navItems = document.querySelectorAll('nav ul li a')

  for (var m = 0; m < navItems.length; m++) {
    navItems[m].addEventListener('click', function (e) {
      e.preventDefault()

      if (allowScrolling === true && !isInViewport(document.querySelector('#' + this.getAttribute('href')))) {
        allowScrolling = false

        document.querySelector('#' + this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          alignToTop: true
        })

        for (var i = 0; i < 5; i++) {
          let navTimeout = setTimeout(function () {
            for (var i = 0; i < sections.length; i++) {
              if (isInViewport(sections[i])) {
                if (i !== currentSection) {
                  allowScrolling = true
                  clearTimeout(navTimeout)
                }

                currentSection = i
              }
            }
          }, i * 250)
        }

        if (window.mobileAndTabletcheck()) {
          header.classList.remove('open')
        }

        setTimeout(function () {
          allowScrolling = true
        }, 1250)
      }
    })
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 38 && allowScrolling === true) {
      allowScrolling = false
      currentSection--

      sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        alignToTop: true
      })

      setTimeout(function () {
        allowScrolling = true
      }, 500)
    } else if (e.which === 40 && allowScrolling === true) {
      allowScrolling = false
      currentSection++

      sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        alignToTop: true
      })

      setTimeout(function () {
        allowScrolling = true
      }, 500)
    }
  })

  window.addEventListener('resize', function () {
    sections[currentSection].scrollIntoView({
      behavior: 'auto',
      alignToTop: true
    })
  })
})
