import Rx from 'rxjs'
import { bindContext, bindUnsubscribe } from './util.js'

const retryWhen = context => f => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()

  let subscription = new Rx.Subscription()

  let innerSubscription = new Rx.Subscription()

  const next = x => {
    observer.next(x)
  }

  const error = e => {
    const observable = f(e)

    innerSubscription.unsubscribe()

    const innerSub = observable.subscribe({
      next: () => {},
      error: observer.error,
      complete: () => {
        subscription.unsubscribe()
        const sub = context.subscribe({ next, error, complete })
        bindUnsubscribe(subscription, sub)
      }
    })

    bindUnsubscribe(innerSubscription, innerSub)
  }

  const complete = () => {
    observer.complete()
  }

  subscription = context.subscribe({ next, error, complete })

  groupSubscription.add(subscription)

  groupSubscription.add(innerSubscription)


  return groupSubscription
})

module.exports = bindContext(retryWhen)
