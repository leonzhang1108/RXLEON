import Rx from 'rxjs'
import { bindContext } from './util.js'

const publish = context => () => {
  const subject = new Rx.Subject()

  const observable = Rx.Observable.create(observer => subject.subscribe(observer))

  observable.connect = () => context.subscribe(subject)

  return observable
}

module.exports = bindContext(publish)
