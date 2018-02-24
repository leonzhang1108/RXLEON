import Rx from 'rxjs'
import { bindContext } from '@utils'

const distinctUntilChanged = context => () => Rx.Observable.create(observer => {
  let last

  const next = x => {
    if (last && last === x) return
    last = x
    observer.next(x)
  }

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(distinctUntilChanged)
