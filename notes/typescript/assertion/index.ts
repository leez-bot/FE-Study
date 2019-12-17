// 断言，当用 | 不确定是哪一种类型时，可以用断言判断类型

function getLen (something: string | number): number {
  // return something.length; // string和number没有lenght的共同属性，报错

  // if (something.length) return something.length // 当something为num时依然无法识别length属性，报错
  // return something.toString().length

  if ((<string>something).length) {  // 断言为string类型时才走该逻辑
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
  // 断言的第二种形式： 值 as type
  if ((something as string).length) {
    return (something as string).length;
  } else {
    return something.toString().length;
  }
}