import Rx from 'rxjs'
import { bindContext, bindUnsubscribe } from '@utils'
Rx.Observable.prototype.merge = require('@operators/merge')

const expand = context => f => Rx.Observable.create(observer => {
  let subscription = new Rx.Subscription()

  let count = 5

  const error = observer.error

  const doSubscribe = x => {
    observer.next(x)

    const observable = f(x)

    const sub = observable.subscribe({
      next: x => {
        Rx.Scheduler.async(
          () => --count > 0 && doSubscribe(x)
        )
         
      },
      error
    })

    bindUnsubscribe(subscription, sub)
  }

  const next = doSubscribe

  return context.subscribe({ next, error })
})

module.exports = bindContext(expand)
