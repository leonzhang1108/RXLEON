import Rx from 'rxjs'
import { bindContext } from './util.js'
Rx.Observable.of = require('@observables/of')

const map = context => f => Rx.Observable.create(observer => {
  const next = x => {
    let y
    try {
      y = f(x)
      observer.next(y)
    } catch (e) {
      observer.error(Rx.Observable.of(x))
    }
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
