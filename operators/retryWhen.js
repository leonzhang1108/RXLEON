import Rx from 'rxjs'
import { bindContext } from './util.js'

const retryWhen = context => f => Rx.Observable.create(observer => {
  let subscription = new Rx.Subscription()

  const next = x => {
    observer.next(x)
  }

  const error = e => {
    const observable = f(e)
    subscription = observable.subscribe({
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

  return subscription
})

module.exports = bindContext(retryWhen)
