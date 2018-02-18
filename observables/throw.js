import Rx from 'rxjs'

module.exports = e => Rx.Observable.create(observer => {
  observer.error(e)
  Rx.Scheduler.async(observer.complete)
  return new Rx.Subscription()
})
