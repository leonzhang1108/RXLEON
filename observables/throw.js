import Rx from 'toy-rx'

module.exports = e => Rx.Observable.create(observer => {
  observer.error(e)
  observer.complete()
  return new Rx.Subscription()
})
