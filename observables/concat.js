import Rx from 'rxjs'
import { bindUnsubscribe } from '@utils'

module.exports = (...observables) => Rx.Observable.create(observer => {
  let innerSubscription = new Rx.Subscription()

  const bindSubscription = () => {
    const subscription = observables.shift().subscribe({ next, error, complete })
    bindUnsubscribe(innerSubscription, subscription)
  }

  const next = x => {
    observer.next(x)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observables.length
      ? bindSubscription()
      : observer.complete()
  }

  bindSubscription()

  return innerSubscription
})
