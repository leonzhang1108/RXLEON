import Rx from 'toy-rx'
import { bindContext } from '@utils'

const window = context => observable => Rx.Observable.create(observer => {
  const next = () => observer.next(observable)

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(window)
