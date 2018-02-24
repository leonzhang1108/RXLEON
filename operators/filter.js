import Rx from 'rxjs'
import { bindContext } from '@utils'

const filter = context => f => Rx.Observable.create(observer => {
  const next = x => {
    f(x) && observer.next(x)
  }

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(filter)
