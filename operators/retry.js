import Rx from 'rxjs'
import { bindContext } from './util.js'

const retry = context => initCount => Rx.Observable.create(observer => {
  let count = initCount
  let subscription = new Rx.Subscription()

  const next = x => {
    observer.next(x)
  }

  const error = e => {
    if (--count !== 0) {
      subscription.unsubscribe()
      subscription = context.subscribe({ next, error, complete })
    } else {
      observer.error(e)
      observer.complete()
    }
  }

  const complete = () => {
    observer.complete()
  }

  subscription = context.subscribe({ next, error, complete })

  return subscription
})

module.exports = bindContext(retry)
