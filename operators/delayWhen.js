import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const delayWhen = context => f => Rx.Observable.create(observer => {
  const subscription = new Rx.Subscription()

  const error = observer.error

  const next = x => {
    const observable = f(x)

    subscription.unsubscribe()

    const sub = observable.subscribe({
      next,
      error,
      complete: () => context.subscribe({ next, error, complete })
    })

    bindUnsubscribe(subscription, sub)
  }

  const complete = () => {
    subscription.unsubscribe()
    const sub = context.subscribe(observer)
    bindUnsubscribe(subscription, sub)
  }

  const sub = context.subscribe({ next, error, complete })
  bindUnsubscribe(subscription, sub)

  return subscription
})

module.exports = bindContext(delayWhen)
