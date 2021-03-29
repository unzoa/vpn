const fs = require('fs')
const path = require('path')
const request = require('request')

request('https://tr1.freeair888.club/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7', (error, response, body) => {
  let arr = body.split('\n')
    .filter(i => {
      return i.includes('>SSR账号') ||
        i.includes('IP：') ||
        i.includes('端口：') ||
        i.includes('密码：')
    })
    .map((i, j) => {
      return i.replace(/<[^>]*>/g, '')
    })

  let flag = 0
  let mapArr = []
  let entries = []

  arr.forEach((i, j) => {
    switch (flag) {
      case 0:
        entries[0] = i.replace('SSR账号（', '').replace('SSR账号(', '').replace(')', '').replace('）', '')
        break
      case 1:
        entries[1] = i.replace('IP：', '')
        break
      case 2:
        entries[2] = i.replace('端口：', '')
        break
      case 3:
        entries[3] = i.replace('密码：', '')
        break
    }

    if (flag === 3) {
      mapArr.push({
        "enable" : true,
        "password" : entries[3],
        "method" : "rc4",
        "remarks" : entries[0],
        "server" : entries[1],
        "obfs" : "plain",
        "protocol" : "origin",
        "server_port" : Number(entries[2]),
        "remarks_base64" : j
      })
      flag = 0
      entries = []
    } else {
      flag++
    }
  })

  rewriteJson(mapArr)
})

function rewriteJson (arr) {
  fs.readFile('export.json', 'utf8', (err, body) => {
    let obj = JSON.parse(body)
    obj.configs = arr

    fs.writeFile('export.json', JSON.stringify(obj), 'utf8', (er, bo) => {
      console.log(er);
    })
  })
}
