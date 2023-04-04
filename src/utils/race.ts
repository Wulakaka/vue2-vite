/**
 * 不同于Promise.race，只有第一个成功成功被返回
 * Promise.race会返回第一个完成状态的promise，即错误情况也被返回
 * @param arr
 */
export default function race(arr: Promise<unknown>[]): Promise<unknown> {
  return new Promise((resolve, reject) => {
    arr.forEach((p) => {
      p.then((res) => {
        resolve(res)
      }).catch((e) => {})
    })
  })
}

function foo1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('reject foo1')
    }, 100)
  })
}

function foo2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolve foo2')
    }, 200)
  })
}

function foo3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('reject foo3')
    }, 300)
  })
}
function foo4() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolve foo4')
    }, 400)
  })
}

const arr = [foo1(), foo2(), foo3(), foo4()]

race(arr)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })

Promise.race(arr)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })
