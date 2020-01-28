import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const concatMap = context => f => Rx.Observable.create(observer => {
  const observables = []
  const subscription = new Rx.Subscription()
  const groupSubscription = new Rx.GroupSubscription()

  const next = x => {
    const observable = f(x)
    observables.push(observable)
  }

  const error = observer.error

  const concatSubscribe = observable => {
    subscription.unsubscribe()
    const sub = observable.subscribe({
      next: observer.next,
      error,
      complete: () =>
        observables.length
          ? concatSubscribe(observables.shift())
          : observer.complete()
    })
    bindUnsubscribe(subscription, sub)
  }

  const complete = () => {
    concatSubscribe(observables.shift())
  }

  groupSubscription.add(subscription)

  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(concatMap)
