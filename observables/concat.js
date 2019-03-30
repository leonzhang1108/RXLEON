import Rx from 'toy-rx'
import { bindUnsubscribe } from '@utils'

module.exports = (...observables) => Rx.Observable.create(observer => {
  let innerSubscription = new Rx.Subscription()

  const bindSubscription = () => {
    const subscription = observables.shift().subscribe({ next, error, complete })
    bindUnsubscribe(innerSubscription, subscription)
  }

  const next = observer.next

  const error = observer.error

  const complete = () => {
    observables.length
      ? bindSubscription()
      : observer.complete()
  }

  bindSubscription()

  return innerSubscription
})
