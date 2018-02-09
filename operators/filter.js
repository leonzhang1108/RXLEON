import Rx from 'rxjs'
import { bindContext } from './util.js'

const filter = context => f => Rx.Observable.create(observer => {
  const next = x => {
    let y
    try {
      y = f(x)
    } catch (e) {
      error(e)
      return
    }
    y && observer.next(x)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(filter)