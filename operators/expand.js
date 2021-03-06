import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const expand = context => f => Rx.Observable.create(observer => {
  const subscription = new Rx.Subscription()

  let count = 5

  const error = observer.error

  const doSubscribe = x => {
    observer.next(x)

    const observable = f(x)

    const sub = observable.subscribe({
      next: x => Rx.Scheduler.async(() => --count > 0 && doSubscribe(x)),
      error
    })

    bindUnsubscribe(subscription, sub)
  }

  const next = doSubscribe

  return context.subscribe({ next, error })
})

module.exports = bindContext(expand)
