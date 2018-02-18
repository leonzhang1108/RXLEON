import Rx from 'rxjs'

module.exports = () => Rx.Observable.create(observer => {
  Rx.Scheduler.async(observer.complete)
  return new Rx.Subscription()
})
