export default function (fn: (e?: any) => void, interval: number): () => void {
  let startTime: number, endTime: number
  let timer: number
  return function (...args) {
    if (!startTime) {
      startTime = performance.now()
    }
    endTime = performance.now()
    if (endTime - startTime > interval) {
      fn(...args)
      startTime = 0
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
