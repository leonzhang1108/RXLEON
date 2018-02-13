import Rx from 'rxjs'
import { bindContext } from './util.js'

const scan = context => (f, initVal) => Rx.Observable.create(observer => {
  let store = initVal || 0

  const next = x => {
    store = f(store, x)
    observer.next(store)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(scan)
