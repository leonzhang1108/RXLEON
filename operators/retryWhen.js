import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const retryWhen = context => f => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()

  let subscription = new Rx.Subscription()

  let innerSubscription = new Rx.Subscription()

  const next = observer.next

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

  const complete = observer.complete

  const sub = context.subscribe({ next, error, complete })
  bindUnsubscribe(subscription, sub)

  groupSubscription.add(subscription)

  groupSubscription.add(innerSubscription)

  return groupSubscription
})

module.exports = bindContext(retryWhen)
