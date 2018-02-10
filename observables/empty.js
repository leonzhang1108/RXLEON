import Rx from 'rxjs'

module.exports = () => Rx.Observable.create(observer => {
  observer.complete()
  return new Rx.Subscription()
})
