import Rx from 'toy-rx'
import { isString } from '@utils'

module.exports = (...vals) => Rx.Observable.create(observer => {
  vals.length === 1 && isString(vals[0])
    ? vals[0].split('').forEach(observer.next)
    : vals.forEach(observer.next)

  observer.complete()
  return new Rx.Subscription()
})
