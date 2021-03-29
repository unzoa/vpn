// get github
const url = 'https://github.com/Alvin9999/new-pac/wiki/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7'
const request = require('request')
const rewrite = require('./lib/rewrite.js')

let interval = ''
loading()

request(url, (err, res, body) => {
  let arr = body.split('\n')
  let start = arr.indexOf('<tbody>') + 1
  let end = arr.indexOf('</tbody>')
  let beforeHaha = arr.slice(start, end)
    .filter(i => {
      return i !== '<tr>'
    })

  let haha = []
  let item = []
  for (let i = 0; i < beforeHaha.length; i++) {
    let now = beforeHaha[i]
    if (now.includes('</tr>')) {
      haha.push({
        "enable" : true,
        "password" : item[3],
        "method" : item[4],
        "remarks" : item[0],
        "server" : item[1],
        "obfs" : item[6], // "plain",
        "protocol" : item[5], // "origin",
        "server_port" : Number(item[2]),
        "remarks_base64" : i
      })
      item = []
      continue
    }

    item.push(now.replace('<td>', '').replace('</td>', ''))
  }

  clearInterval(interval)
  rewrite(haha)
})

function loading () {
  interval = setInterval(() => {
    console.log('#')
  }, 1000)
}
