const JSON5 = require('json5')
const rewrite = require('./lib/rewrite.js')

const str = `
节点1-洛杉矶：ssr103.free3333.xyz 端口：443 密码： dongtaiwang.com 加密方式：none 协议：auth_chain_a 混淆：tls1.2_ticket_auth
节点2-莫斯科：ssr11.free3333.xyz 端口：443 密码： dongtaiwang.com 加密方式：none 协议：auth_chain_a 混淆：tls1.2_ticket_auth
节点3-德国：89.163.224.142 端口：40121 密码： dongtaiwang.com 123abc 加密方式：rc4 协议：origin 混淆：plain
节点4-西雅图：173.0.55.67 端口：13011 密码： dongtaiwang.com 123abc 加密方式：rc4 协议：origin 混淆：plain
`

let haha = []

function isCn (params) {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
  return reg.test(params)
}

let flag = 0

const transStr = str
  .replace(/ /g, '')
  .replace(/：/g, ': "')
  .replace(/\n/g, '')

  .split('')
  .map((i, j, arr) => {
    if (j > 1 && isCn(i) && !isCn(arr[j - 1]) && arr[j - 1] !== '-') {
      flag++
      if (flag === 6) {
        flag = 0
        return `"},\n{"${i}`
      } else {
        return `","${i}`
      }
    } else if (j > 1 && isCn(i) && arr[j + 1] === ':') { // key
      return `${i}"`
    } else if (j === 0) { // 开头
      return `[{"${i}`
    } else if (j === arr.length - 1) { // 结尾
      return `${i}"}]`
    } else {
      return i
    }
  })
  .join('')

  .replace(/端口/g, 'server_port')
  .replace(/密码/g, 'password')
  .replace(/加密方式/g, 'method')

  .replace(/协议/g, 'protocol')
  .replace(/混淆/g, 'obfs')

haha = JSON5.parse(transStr).map((i, j, arr) => {
  let entry = Object.entries(i)[0]
  return {
    ...i,
    "server_port": Number(i.server_port),
    "enable" : true,
    "remarks" : entry[0],
    "server" : entry[1],
    "remarks_base64" : j
  }
})

rewrite(haha)

