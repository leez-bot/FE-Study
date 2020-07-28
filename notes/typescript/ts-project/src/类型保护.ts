function toUpperCase(str: string | string[]) {
  str.length // 公共属性可用
  // return str.toUpperCase() // 报错，数组无此方法
  // 方案1，断言
  if ((<string>str)) {
    return (<string>str).toUpperCase()
  } else {
    (<string[]>str).push()
  }

  // 方案2，类型保护
  // typeof方法
  if (typeof str === 'string') {
    str.toUpperCase()
  } else {
    str.push()
  }
  // instanceof方法
  if (str instanceof Array) {
    str.push()
  } else {
    str.toUpperCase()
  }

  if (Array.isArray(str)) {
    str.push()
  } else {
    str.toUpperCase()
  }

  // 自定义类型保护
}