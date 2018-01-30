import Observable from './Observable'
import Subscription from './Subscription'

class Subject extends Observable {
  constructor () {
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

module.exports = Subject
