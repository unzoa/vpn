const fs = require('fs')
let tar = {
  "random" : false,
  "authPass" : null,
  "useOnlinePac" : false,
  "TTL" : 0,
  "global" : false,
  "reconnectTimes" : 3,
  "index" : 0,
  "proxyType" : 0,
  "proxyHost" : null,
  "authUser" : null,
  "proxyAuthPass" : null,
  "isDefault" : false,
  "pacUrl" : null,
  "configs" : [],
  "proxyPort" : 0,
  "randomAlgorithm" : 0,
  "proxyEnable" : false,
  "enabled" : true,
  "autoban" : false,
  "proxyAuthUser" : null,
  "shareOverLan" : false,
  "localPort" : 1080
}

module.exports = function (arr) {
  tar.configs = arr
  let data = new Uint8Array(Buffer.from(JSON.stringify(tar).replace(/\u00a0/g, ' ')))

  fs.writeFile('export.json', data, (er, bo) => {
    console.log(er);
  })
}
