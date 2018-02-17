import Rx from 'rxjs'
import { bindContext } from './util.js'

const delay = context => f => Rx.Observable.create(observer => {
  let observable

  let subscription = new Rx.Subscription()

  const next = x => {
    observable = f(x)
    subscription.unsubscribe()
    subscription = observable.subscribe({
      next,
      error,
      complete: () => {
        context.subscribe(observer)
      }
    })
  }

  const error = observer.error

  const complete = () => {
    subscription.unsubscribe()
    subscription = context.subscribe(observer)
  }

  subscription = context.subscribe({ next, error, complete })

  return subscription
})

module.exports = bindContext(delay)
