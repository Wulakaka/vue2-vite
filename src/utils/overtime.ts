type InputFn = (...args: any[]) => any
export default function (fn: InputFn, interval: number): InputFn {
  let startTime: number, endTime: number
  let timer: number
  return function (...args) {
    if (!startTime) {
      startTime = performance.now()
    }
    endTime = performance.now()
    if (endTime - startTime > interval) {
      startTime = 0
      return fn(...args)
    } else {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        startTime = 0
      }, interval)
    }
  }
}
