import Rx from 'rxjs'
import { bindContext } from './util.js'

const debounceTime = context => time => Rx.Observable.create(observer => {
  let timeout

  const doDebouceTime = f => {
    clearTimeout(timeout)
    timeout = setTimeout(f, time)
  }

  const next = x => {
    doDebouceTime(() => observer.next(x))
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    doDebouceTime(observer.complete)
  }

  const subscription = context.subscribe({ next, error, complete })

  return new Rx.Subscription(() => {
    subscription.unsubscribe()
    clearTimeout(timeout)
  })
})

module.exports = bindContext(debounceTime)
