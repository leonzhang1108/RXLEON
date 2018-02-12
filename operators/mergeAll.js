import Rx from 'rxjs'
import { bindContext } from './util.js'

const mergeAll = context => () => Rx.Observable.create(observer => {

  const innerSubscription = new Rx.Subscription()

  const next = observable => {
    observable.subscribe({
      next: observer.next,
      error
    })
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(mergeAll)
