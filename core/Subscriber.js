import Subscription from './Subscription'

class Subscriber extends Subscription {
  constructor (observer) {
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

module.exports = Subscriber
