// 1、null和undefined值被定义后不能再被赋值
// 2、null和undefined类型是所有类型的子类型，其他类型可以赋值为null和undefined

let un: undefined;
// un = 1  // 报错

let nul: null;

// nul = 1  // 报错

let a: string = 'hello'

// a = null // 开户严格类型检查后，不能将null和undefined赋值给其他类型
// a = undefined

// 未赋值和未指定类型的变量，默认类型为any,默认值为undefined
let b;


// ele 值可能为ele，也可能为null
let ele = document.querySelector('.box')

// ele.id // 可能为null，会报错

if (ele) {
  ele.id
}

