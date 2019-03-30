import Rx from 'toy-rx'
import { bindContext } from '@utils'

const reduce = context => (f, initVal) => Rx.Observable.create(observer => {
  let store = initVal || 0

  const next = x => {
    store = f(store, x)
  }

  const error = observer.error

  const complete = () => {
    observer.next(store)
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(reduce)
