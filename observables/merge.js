import Rx from 'rxjs'

module.exports = (...observables) => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()

  observables.forEach(observable => {
    groupSubscription.add(observable.subscribe(observer))
  })

  return groupSubscription
})
