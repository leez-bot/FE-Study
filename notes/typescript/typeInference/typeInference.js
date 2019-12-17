// 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
var seven = 'seven';
// seven = 3 报错，初始赋值时有类型，则推断为初始值类型
seven = 'hello';
