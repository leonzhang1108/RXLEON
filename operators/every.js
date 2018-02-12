import Rx from 'rxjs'
import { bindContext } from './util.js'

const every = context => f => Rx.Observable.create(observer => {
  let y = false

  const next = x => {
    y = f(x)
    if (y) return
    observer.next(y)
    observer.complete()
    subscription.unsubscribe()
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    y && observer.next(y)
    observer.complete()
  }

  const subscription = context.subscribe({ next, error, complete })

  return subscription
})

module.exports = bindContext(every)
