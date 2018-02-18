import Rx from 'rxjs'

module.exports = (...vals) => Rx.Observable.create(observer => {
  vals.forEach(x => observer.next(x))
  Rx.Scheduler.async(observer.complete)
  return new Rx.Subscription()
})
