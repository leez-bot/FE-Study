// any类型可以赋值给任意类型，任意值也可以赋值为any
let aa: any;
aa = 1;
aa.includes('aa')
aa.push('dddd')

let bb: string;

bb = aa;

// unknown类型，只能赋值给unknown和any类型，且没有任何方法属性

let aa2: unknown;

// aa2.set('hh') // 报错