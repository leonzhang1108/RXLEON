import Rx from 'rxjs'

module.exports = array => Rx.Observable.create(observer => {
  array.forEach(x => observer.next(x))
  Rx.Scheduler.async(observer.complete)
  return new Rx.Subscription()
})
