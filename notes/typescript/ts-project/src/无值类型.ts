// 没有返回值时，为无值类型： void


function fn(): void {

}

fn()

// never类型，永远不会return的函数  void有return ,但没有return 内容
// never类型是其他类型的子类型；其他类型不可以被赋值为never
function fn2(): never {
  throw new Error('wrong')
}