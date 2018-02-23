import Rx from 'rxjs'
import { bindContext } from '@utils'

const refCount = subject => () => {
  const subscription = subject.connect()

  let count = 0

  const observable = Rx.Observable.create(observer => {
    count++

    const sub = subject.subscribe({
      next: observer.next,
      error: observer.error,
      complete: () => {
        count--
        observer.complete()
      }
    })
    
    return new Rx.Subscription(() => {
      Rx.Scheduler.async(sub.unsubscribe)
      // todooooooooo
      subscription.unsubscribe()
    })
  })

  return observable
}

module.exports = bindContext(refCount)
