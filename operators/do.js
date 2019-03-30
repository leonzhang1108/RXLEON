import Rx from 'toy-rx'
import { bindContext } from '@utils'

const doOperator = context => f => Rx.Observable.create(observer => {
  const next = x => {
    f(x)
    observer.next(x)
  }

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(doOperator)
