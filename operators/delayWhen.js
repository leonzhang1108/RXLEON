import Rx from 'rxjs'
import { bindContext, bindUnsubscribe } from '@utils'

const delayWhen = context => f => Rx.Observable.create(observer => {
  let observable

  let subscription = new Rx.Subscription()

  const error = observer.error

  const next = x => {
    observable = f(x)

    subscription.unsubscribe()

    const sub = observable.subscribe({
      next,
      error,
      complete: () => {
        context.subscribe({ next, error, complete })
      }
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
