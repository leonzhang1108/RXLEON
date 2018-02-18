import Rx from 'rxjs'
import { bindContext } from './util.js'

const retryWhen = context => (f, max) => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()

  let subscription = new Rx.Subscription()

  let innerSubscription = new Rx.Subscription()

  let i = 0

  const next = x => {
    observer.next(x)
  }

  const error = e => {
    const observable = f(e)

    innerSubscription.unsubscribe()

    if (max) {
      i++
      if (i >= max) {
        observer.complete()
        return
      }
    }
    innerSubscription = observable.subscribe({
      next: () => {},
      error: observer.error,
      complete: () => {
        subscription.unsubscribe()
        subscription = context.subscribe({ next, error, complete })
      }
    })
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
