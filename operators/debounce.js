import Rx from 'rxjs'
import { bindContext } from './util.js'

const debounce = context => f => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()
  let onOff = true

  const next = x => {
    if (!onOff) return

    observer.next(x)

    onOff = false

    const observable = f(x)

    const subscription = observable.subscribe({
      next: x => observer.next(x),
      error: e => observer.error(e),
      complete: () => {
        onOff = true
        subscription.unsubscribe()
      }
    })

    groupSubscription.add(subscription)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(debounce)
