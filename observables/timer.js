import Rx from 'rxjs'

module.exports = (...vals) => Rx.Observable.create(observer => {
  let i = 0
  let delay, period

  if (vals.length === 0) {
    observer.error('no parameters')
  }

  delay = vals.shift()

  if (vals.length) {
    period = vals.shift()
  }

  if (period) {
    let timeout

    const doInterval = () => {
      timeout = setInterval(() => observer.next(i++), period)
    }

    setTimeout(doInterval, delay)

    return new Rx.Subscription(() => clearInterval(timeout))
  } else {
    setTimeout(() => observer.next(i), delay)

    observer.complete()

    return new Rx.Subscription()
  }
})
