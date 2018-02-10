import Rx from 'rxjs'
import { bindContext } from './util.js'

const map = context => f => Rx.Observable.create(observer => {
  const next = x => {
    observer.next(f(x))
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(map)
