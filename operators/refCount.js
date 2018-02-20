import Rx from 'rxjs'
import { bindContext } from './util.js'

const refCount = context => () => {
  const observable = Rx.Observable.create(observer => {

    const next = x => {
      observer.next(x)
    }
  
    const error = e => {
      observer.error(e)
    }
  
    const complete = () => {
      console.log('fuck')
      // observer.complete()
    }
  
    return context.subscribe({ next, error, complete })
  })

  context.connect()

  return observable
}

module.exports = bindContext(refCount)
