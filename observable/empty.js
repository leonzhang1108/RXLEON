import Rx from '@core'

module.exports = () => Rx.Observable.create(observer => {
  observer.complete()
  return new Rx.Subscription()
})