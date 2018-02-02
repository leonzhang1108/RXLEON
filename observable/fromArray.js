import Rx from '@core'

module.exports = array => Rx.Observable.create(observer => {
  array.forEach(x => observer.next(x))
  observer.complete()
  return new Rx.Subscription()
})
