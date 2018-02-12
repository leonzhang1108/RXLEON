import Rx from 'rxjs'
import { bindContext } from './util.js'

const concat = context => observable => Rx.Observable.create(observer => {
  let subscription

  const next = x => {
    observer.next(x)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    subscription = observable.subscribe(observer)
  }

  subscription = context.subscribe({ next, error, complete })

  return subscription
})

module.exports = bindContext(concat)
