import Rx from 'rxjs'

module.exports = (...vals) => {
  let i = 0
  let delay, period

  if (vals.length === 0) {
    console.log('no parameters')
    return
  }

  delay = vals.shift()

  if (vals.length) {
    period = vals.shift()
  }

  if (period) {
    return Rx.Observable.create(observer => {
      let interval

      const doInterval = () => {
        interval = setInterval(() => observer.next(i++), period)
      }

      let timeout = setTimeout(doInterval, delay)

      return new Rx.Subscription(() => {
        clearInterval(interval)
        clearTimeout(timeout)
      })
    })
  } else {
    return Rx.Observable.create(observer => {
      let subscription = new Rx.Subscription()
      
      const timeout = setTimeout(() => {
        subscription.unsubscribe()
        observer.complete()
      }, delay)

      subscription = new Rx.Subscription(() => clearTimeout(timeout))
      return subscription
    })
  }
}
