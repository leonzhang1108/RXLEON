import Rx from 'toy-rx'
import { bindContext } from '@utils'

const debounceTime = context => time => Rx.Observable.create(observer => {
  let timeout

  const doDebouceTime = f => {
    clearTimeout(timeout)
    timeout = setTimeout(f, time)
  }

  const next = x => doDebouceTime(() => observer.next(x))

  const error = observer.error

  const complete = () => setTimeout(observer.complete, time)

  const subscription = context.subscribe({ next, error, complete })

  return new Rx.Subscription(() => {
    subscription.unsubscribe()
    clearTimeout(timeout)
  })
})

module.exports = bindContext(debounceTime)
