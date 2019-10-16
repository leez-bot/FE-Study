// https://mp.weixin.qq.com/s/kK-zAtXQy4FLnalaE7gRVA  原文地址

// 请求的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECT = 'reject'

function MyPromise(fn) {
  let self = this // 缓存当前promise实例
  self.value = null // 成功值
  self.error = null // 失败值
  self.status = PENDING
  // self.onFulfilled = null // 成功回调
  self.onFulfilledCallbacks = [] // 用数组存储回调函数，用以支持链式调用
  // self.onRejected = null // 失败回调
  self.onRejectedCallbacks = []

  function resolve(value) {
    // 使用setTimeout将函数变为宏观任务，支持同步执行
    if (self.status !== PENDING) return
    setTimeout(() => {
      self.value = value
      self.status = FULFILLED
      // self.onFulfilled(self.value)
      self.onFulfilledCallbacks.forEach((callback) => callback(self.value))
    })
  }

  function reject(error) {
    if (self.status !== PENDING) return
    setTimeout(() => {
      self.error = error
      self.status = REJECT
      // self.onRejected(self.error)
      self.onRejectedCallbacks.forEach((callback) => callback(self.error))
    })
  }

  fn(resolve, reject)
}

// myPromise.prototype.then = function(onFulfilled, onRejected) {
//   // 给promise实例注册成功/失败回调
//   if (this.status === PENDING) {
//     // this.onFulfilled = onFulfilled
//     // this.onRejected = onRejected
//     this.onFulfilledCallbacks.push(onFulfilled)
//     this.onRejectedCallbacks.push(onRejected)
//   } else if (this.status === FULFILLED) {
//     onFulfilled(this.value) // 如果状态是fulfilled，直接执行成功回调
//   } else {
//     onRejected(this.value)
//   }
//   return this
// }

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this;
  let bridgePromise;
  //防止使用者不传成功或失败回调函数，所以成功失败回调都给了默认回调函数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
  if (self.status === FULFILLED) {
      return bridgePromise = new MyPromise((resolve, reject) => {
          setTimeout(() => {
              try {
                  let x = onFulfilled(self.value);
                  resolvePromise(bridgePromise, x, resolve, reject);
              } catch (e) {
                  reject(e);
              }
          });
      })
  }
  if (self.status === REJECTED) {
      return bridgePromise = new MyPromise((resolve, reject) => {
          setTimeout(() => {
              try {
                  let x = onRejected(self.error);
                  resolvePromise(bridgePromise, x, resolve, reject);
              } catch (e) {
                  reject(e);
              }
          });
      });
  }
  if (self.status === PENDING) {
      return bridgePromise = new MyPromise((resolve, reject) => {
          self.onFulfilledCallbacks.push((value) => {
              try {
                  let x = onFulfilled(value);
                  resolvePromise(bridgePromise, x, resolve, reject);
              } catch (e) {
                  reject(e);
              }
          });
          self.onRejectedCallbacks.push((error) => {
              try {
                  let x = onRejected(error);
                  resolvePromise(bridgePromise, x, resolve, reject);
              } catch (e) {
                  reject(e);
              }
          });
      });
  }
}
//catch方法其实是个语法糖，就是只传onRejected不传onFulfilled的then方法
MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}
//用来解析回调函数的返回值x，x可能是普通值也可能是个promise对象
function resolvePromise(bridgePromise, x, resolve, reject) {
 //如果x是一个promise
  if (x instanceof MyPromise) {
      //如果这个promise是pending状态，就在它的then方法里继续执行resolvePromise解析它的结果，直到返回值不是一个pending状态的promise为止
      if (x.status === PENDING) {
          x.then(y => {
              resolvePromise(bridgePromise, y, resolve, reject);
          }, error => {
              reject(error);
          });
      } else {
          x.then(resolve, reject);
      }
      //如果x是一个普通值，就让bridgePromise的状态fulfilled，并把这个值传递下去
  } else {
      resolve(x);
  }
}

// 实现promise.all,.resolve,.reject, .race
MyPromise.all = function(promises) {
  return new MyPromise(function(resolve, reject) {
      let result = [];
      let count = 0;
      for (let i = 0; i < promises.length; i++) {
          promises[i].then(function(data) {
              result[i] = data;
              if (++count == promises.length) {
                  resolve(result);
              }
          }, function(error) {
              reject(error);
          });
      }
  });
}

MyPromise.race = function(promises) {
  return new MyPromise(function(resolve, reject) {
      for (let i = 0; i < promises.length; i++) {
          promises[i].then(function(data) {
              resolve(data);
          }, function(error) {
              reject(error);
          });
      }
  });
}

MyPromise.resolve = function(value) {
  return new MyPromise(resolve => {
      resolve(value);
  });
}

MyPromise.reject = function(error) {
  return new MyPromise((resolve, reject) => {
      reject(error);
  });
}

module.exports = MyPromise