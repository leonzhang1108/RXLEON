import Rx from 'rxjs'
import { bindContext } from './util.js'

const mapTo = context => val => Rx.Observable.create(observer => {
  const next = () => {
    observer.next(val)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(mapTo)
