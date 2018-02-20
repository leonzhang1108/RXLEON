import Rx from 'rxjs'
import { bindContext } from './util.js'

const refCount = context => () => {
  let count = 1

  const subject = new Rx.Subject()

  const mainSub = context.subscribe(subject)

  context.connect()

  const observable = Rx.Observable.create(observer => {
    count++

    let sub = subject.subscribe(observer)

    return new Rx.Subscription(() => {
      --count === 0 && mainSub.unsubscribe()
      sub.unsubscribe()
    })
  })

  return observable
}

module.exports = bindContext(refCount)
