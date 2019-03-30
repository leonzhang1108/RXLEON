import Rx from 'toy-rx'
import { isArray } from '@utils'

module.exports = array => Rx.Observable.create(observer => {
  !isArray(array) && observer.error('param is illegal')

  array.forEach(observer.next)
  observer.complete()

  return new Rx.Subscription()
})
