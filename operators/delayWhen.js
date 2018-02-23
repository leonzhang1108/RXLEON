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
        context.subscribe(observer)
      }
    })

    bindUnsubscribe(subscription, sub)
  }

  const complete = () => {
    subscription.unsubscribe()
    subscription = context.subscribe(observer)
  }

  subscription = context.subscribe({ next, error, complete })

  return subscription
})

module.exports = bindContext(delayWhen)
