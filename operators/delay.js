import Rx from 'rxjs'
import { bindContext } from './util.js'

const delay = context => period => Rx.Observable.create(observer => {
  const next = x => {
    setTimeout(() => observer.next(x), period)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(delay)
