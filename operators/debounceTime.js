import Rx from 'rxjs'
import { bindContext } from './util.js'

const debounceTime = context => time => Rx.Observable.create(observer => {
  let onOff = true
  let timeout

  const next = x => {
    if (!onOff) return

    observer.next(x)

    onOff = false

    timeout = setTimeout(() => {
      onOff = true
    }, time)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  const subscription = context.subscribe({ next, error, complete })

  return new Rx.Subscription(() => {
    subscription.unsubscribe()
    clearTimeout(timeout)
  })
})

module.exports = bindContext(debounceTime)
