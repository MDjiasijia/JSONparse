var madajiasija = {
  parseJson: function(jsonStr) {
    var result
    var i = 0
    return result = parseValue(jsonStr)
  
    function parseValue(jsonStr) {
      while (/[ \n\r\t\b]/.test(jsonStr[i])) {
        i++ // 跳过空白
      }
      for (; i < jsonStr.length; i++) {
        if (jsonStr[i] === `{`) {
          i++
          return parseObject(jsonStr)
        }
        if (jsonStr[i] === `[`) {
          i++
          return parseArray(jsonStr)
        }
        if (jsonStr[i] === `"`) {
          i++
          return parseString(jsonStr)
        }
        if (jsonStr[i] === `t` || jsonStr[i] === `f`) {
          return parseBoolean(jsonStr)
        }
        if (jsonStr[i] === `n`) {
          i = i + 4
          return null
        } else {
          return parseNumber(jsonStr)
        }
      }
    }
    
    function parseObject(jsonStr) {
      var res = {}
      while (jsonStr[i] !== `}`) {
        var key = parseValue(jsonStr)
        var value
        i++  // 跳过`:`
        value = parseValue(jsonStr)
        res[key] = value
        while (/[ ,]/.test(jsonStr[i])) {
          i++ // 跳过`,`和空白
        }
      }
      i++ //跳过“}”
      return res
    }
  
    function parseArray(jsonStr) {
      var res = []
      var value
      while (jsonStr[i] !== `]`) {
        value = parseValue(jsonStr)
        res.push(value)
        while (/[ ,]/.test(jsonStr[i])) {
          i++ // 跳过`,`和空白
        }
      }
      i++ // 跳过结束“]”
      return res
    }
  
    function parseString(jsonStr) {
      var res = ``
      var j = i
      while (jsonStr[i] !== `"` && jsonStr[i - 1] !== `\\`) {
        i++
      }
      res = jsonStr.slice(j, i)
      i++//跳过字符串结尾引号结束`"`
      return res
    }
  
    function parseBoolean(jsonStr) {
      if (jsonStr[i] === `t`) {
        i = i + 4
        return true
      } else {
        i = i + 5
        return false
      }
    }
  
    function parseNumber(jsonStr) {
      var res = ``
      var j = i
      while (/[0-9\.e\-+]/i.test(jsonStr[i]) && i < jsonStr.length) {
        i++
      }
      return res = Number(jsonStr.slice(j, i))
    }
  }
}