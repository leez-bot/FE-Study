// 联合类型（Union Types）表示取值可以为多种类型中的一种
var seven;
seven = 'seven';
seven = 7;
// 当变量为联合类型时，只能可以访问两种类型的   共有   方法
function getString(something) {
    console.log(something.toString());
    // console.log(something.length) 报错
    // console.log(something++) 报错
}
var eight;
eight = 'eight';
console.log(eight.length);
eight = 8;
// console.log(eight.length) 报错，推断为number类型
