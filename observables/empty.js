import Rx from 'rxjs'

module.exports = () => Rx.Observable.create(observer => {
  observer.next()
  observer.complete()
  return new Rx.Subscription()
})
