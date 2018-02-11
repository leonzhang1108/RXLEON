import Rx from 'rxjs'
import { bindContext } from './util.js'

const concat = context => observable => Rx.Observable.create(observer => {
  const next = x => {
    observer.next(x)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observable.subscribe(observer)
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(concat)
