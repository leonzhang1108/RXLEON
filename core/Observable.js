import Subscriber from './Subscriber'

class Observable {
  constructor(subscribe) {
    this.subscribe = subscribe
  }

  static create = subscribe => new Observable(observer => {
    const subscriber = new Subscriber(observer)
    const subscription = subscribe(subscriber)
    subscriber.unsubscribe = subscription.unsubscribe.bind(subscription)
    return subscription
  })
}

module.exports = Observable