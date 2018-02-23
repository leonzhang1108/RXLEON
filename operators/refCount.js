import Rx from 'rxjs'
import { bindContext } from '@utils'

const refCount = subject => () => {
  const subscription = subject.connect()

  let count = 0

  const observable = Rx.Observable.create(observer => {
    count++

    const sub = subject.subscribe(observer)
    
    return new Rx.Subscription(() => {
      Rx.Scheduler.async(() => {
        if (sub.unsubscribe() && --count <= 0) {
          subscription.unsubscribe()
          console.log(subject)
        }
      })
    })
  })

  return observable
}

module.exports = bindContext(refCount)
