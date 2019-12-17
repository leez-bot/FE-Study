// 函数式场景函数（同时约束输入和输出，输入参数严格匹配）
function sum(x, y) {
    return x + y;
}
sum(1, 2);
// sum(1, 3, 4) // 参数数量错误
// sum(1, '3') // 参数类型错误
// 函数表达式场景函数
var getSum = function (x, y) {
    return x + y;
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 可选参数 可选参数后不允许再有必选参数
function buildName(firstName, lastName) {
    return lastName ? firstName + lastName : firstName;
}
// 设置默认参数后，可选参数后面可以有必填参数
function buildName2(firstName, lastName) {
    if (firstName === void 0) { firstName = 'tom'; }
    return firstName + lastName;
}
// 使用...rest表示剩余所有参数
function push(a) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    rest.forEach(function (item) { return a.push(item); });
    return a;
}
var a = [];
push(a, 1, 2, 3); // [1,2,3]
