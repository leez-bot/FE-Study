// 一、联合类型：也称多选类型，用于标注一个变量为多个类型之一,用符号 | 表示

function css(ele: Element, attr: string, value: number | string) {

}

const box = document.getElementById('box')

// box 可能为null
if (box) {
  css(box, 'width', 50)
  css(box, 'width', '50')
  // css(box, 'width', ['50'])  // 报错
}

// 二、交叉类型：也称合并类型，把多个类型合并到一起成为一种新类型，用符号 & 表示

interface o1 {
  x: number,
  y: number
}
interface o2 {
  z: number
}

let obj11: o1 = {
  x: 1,
  y: 2
}

let obj22: o2 = {
  z: 3
}

let obj3: o1 & o2 = { ...obj11, ...obj22 }
console.log(obj3.x)
console.log(obj3.z)

// 三、字面量类型：标注的类型不是固定类型，而是自定义指定的若干种类型之一

function setPostion(el: Element, direction: 'left' | 'top' | 'bottom' | 'right') {
  // ...
}

let box2 = document.getElementById('box2')
if (box2) {
  setPostion(box2, 'left')
  setPostion(box2, 'right')
  // setPostion(box2, 'hehe') // 报错
}

// 四、类型别名：给自定义类型取一个别名，用于公共自定义类型提取
type positons = 'left' | 'top' | 'bottom' | 'right'

function setPostions(el: Element, direction: positons) {
  // ...
}

// 五、类型推导： 初始化变量时，ts会根据默认值推导出变量类型
let anumber = 1; // a被推导为number
// anumber = '1' // 报错，a已经为number，不能赋值为string

function fn(x = 1) {
  x = 4
  // x = 'd' // 报错
}

// 六、类型断言：给定一个更精确的类型判断
let img = document.querySelector('.imgDiv') // 推导类型为element
// 断言给定具体类型
let img2 = <HTMLImageElement>document.querySelector('.imgDiv');
let img3 = document.querySelector('.imgDiv') as HTMLImageElement;
if (img) {
  // element类型无src属性
  // img.src = 'hello' // 报错
  img2.src = 'hello'
  img3.src = 'hehe'
}