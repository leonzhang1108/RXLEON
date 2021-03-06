import Rx from 'toy-rx'
import { bindContext } from '@utils'
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

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(map)
