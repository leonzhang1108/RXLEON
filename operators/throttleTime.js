import Rx from 'rxjs'
import { bindContext } from '@utils'

const throttleTime = context => time => Rx.Observable.create(observer => {
  let timeout
  let onOff = true

  const next = x => {
    if (!onOff) return

    observer.next(x)

    onOff = false

    clearTimeout(timeout)

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

module.exports = bindContext(throttleTime)
