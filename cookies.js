window.addEventListener('load', function () {
  let cookie = document.querySelector('div#cookie')

  if (getCookie('cookie') !== 'ok') {
    cookie.querySelector('div button').addEventListener('click', function () {
      let now = new Date()
      let time = now.getTime()
      let expireTime = time + 1000 * 36000
      now.setTime(expireTime)
      document.cookie = 'cookie=ok;expires=' + now.toGMTString() + ';path=/'
      cookie.style.opacity = 0
      setTimeout(function () {
        cookie.remove()
      }, 500)
    })
  } else {
    cookie.remove()
  }
})

function getCookie (cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')

  for (var i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
