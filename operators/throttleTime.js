import Rx from 'rxjs'
import { bindContext } from './util.js'

const throttleTime = context => time => Rx.Observable.create(observer => {
  
  let timeout
  let onOff = true

  let latest

  const next = x => {

    latest = x

    if (!onOff) return

    onOff = false
    
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      onOff = true
      observer.next(latest)
      latest = undefined
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
