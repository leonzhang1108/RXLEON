import Rx from 'rxjs'
import { bindContext } from '@utils'

const every = context => f => Rx.Observable.create(observer => {
  let y = false
  let subscription

  const next = x => {
    y = f(x)
    if (y) return
    observer.next(y)
    observer.complete()
    subscription.unsubscribe()
  }

  const error = observer.error

  const complete = () => {
    y && observer.next(y)
    observer.complete()
  }

  subscription = context.subscribe({ next, error, complete })

  return subscription
})

module.exports = bindContext(every)
