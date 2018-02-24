import Rx from 'rxjs'

module.exports = (...vals) => Rx.Observable.create(observer => {
  vals.forEach(observer.next)
  observer.complete()
  return new Rx.Subscription()
})
