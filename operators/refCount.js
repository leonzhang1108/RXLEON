import Rx from 'rxjs'
import { bindContext } from '@utils'

const refCount = context => () => {
  const subscription = context.connect()
  console.log(subscription.unsubscribe.toString())

  let count = 0

  const observable = Rx.Observable.create(observer => {
    count++

    const sub = context.subscribe(observer)

    return new Rx.Subscription(() => {
      Rx.Scheduler.async(() => {
        if (sub.unsubscribe() && --count <= 0) {
          subscription.unsubscribe()
        }
      })
    })
  })

  return observable
}

module.exports = bindContext(refCount)
