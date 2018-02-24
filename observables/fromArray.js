import Rx from 'rxjs'

module.exports = array => Rx.Observable.create(observer => {
  array.forEach(observer.next)
  observer.complete()
  return new Rx.Subscription()
})
