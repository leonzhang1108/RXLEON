import Rx from 'toy-rx'
import { bindUnsubscribe } from '@utils'

module.exports = (...vals) => {
  let i = 0
  let delay = null
  let period = null

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

      const timeout = setTimeout(doInterval, delay)

      return new Rx.Subscription(() => {
        clearInterval(interval)
        clearTimeout(timeout)
      })
    })
  } else {
    return Rx.Observable.create(observer => {
      const subscription = new Rx.Subscription()

      const timeout = setTimeout(() => {
        observer.next(i)
        subscription.unsubscribe()
        observer.complete()
      }, delay)

      const sub = new Rx.Subscription(() => clearTimeout(timeout))
      bindUnsubscribe(subscription, sub)

      return subscription
    })
  }
}
