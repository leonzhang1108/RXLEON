import Rx from 'rxjs'
import { bindContext } from '@utils'

// 多播
const multicast = context => subject => {
  const observable = Rx.Observable.create(observer => subject.subscribe(observer))

  observable.connect = () => context.subscribe(subject)

  return observable
}

module.exports = bindContext(multicast)
