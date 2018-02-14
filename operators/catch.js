import Rx from 'rxjs'
import { bindContext } from './util.js'

const catchOperator = context => f => Rx.Observable.create(observer => {
  const next = x => {
    observer.next(x)
  }

  const error = e => {
    const observable = f(e)

    observable.subscribe({
      next: observer.next,
      error: observer.error
    })
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(catchOperator)
