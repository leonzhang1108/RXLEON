import Subscriber from './Subscriber'
import { bindUnsubscribe } from '@utils'

class Observable {
  constructor (subscribe) {
    this.subscribe = subscribe
  }

  static create = subscribe => new Observable(observer => {
    const subscriber = new Subscriber(observer)
    const subscription = subscribe(subscriber)
    bindUnsubscribe(subscriber, subscription)
    return subscription
  })
}

module.exports = Observable
