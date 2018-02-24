import Rx from 'rxjs'
import { bindContext } from '@utils'

const take = context => max => Rx.Observable.create(observer => {
  let taken = 0

  const next = x => {
    observer.next(x)
    ++taken === max && observer.complete()
  }

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(take)
