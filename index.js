
class Subscription {
  constructor(unsubscribe) {
    this.unsubscribe = unsubscribe
  }
}


class Subscriber extends Subscription {
  constructor(observer) {
    super(() => {})
    this.observer = observer
  }

  next = x => this.observer.next(x)

  error = e => {
    this.observer.error(e)
    this.unsubscribe()
  }

  complete = () => {
    this.observer.complete()
    this.unsubscribe()
  }
}


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

class Subject extends Observable {
  constructor() {
    super(observer => {
      this.observers.push(observer)
      return new Subscription(() => {
        const index = this.observers.indexOf(observer)
        if (index >= 0) this.observers.splice(index, 1)
      })
    })
  }

  observers = []

  next = x => this.observers.forEach(observer => observer.next(x))

  error = e => this.observers.forEach(observer => observer.error(e))

  complete = () => this.observers.forEach(observer => observer.complete())
}

const Rx = {
  Subject,
  Subscription,
  Observable
}

module.exports = Rx
