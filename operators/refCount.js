import Rx from 'toy-rx'
import { bindContext } from '@utils'

const refCount = context => () => {
  const subscription = context.connect()

  let count = 0

  const observable = Rx.Observable.create(observer => {
    count++

    const sub = context.subscribe(observer)

    return new Rx.Subscription(() => {
      Rx.Scheduler.async(() => {
        sub.unsubscribe() && --count <= 0 && subscription.unsubscribe()
      })
    })
  })

  return observable
}

module.exports = bindContext(refCount)
