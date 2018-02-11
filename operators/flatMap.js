import Rx from 'rxjs'
import { bindContext } from './util.js'

const flatMap = context => f => Rx.Observable.create(observer => {
  const next = x => {
    const observable = f(x)
    observable.subscribe({ next: observer.next })
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(flatMap)
