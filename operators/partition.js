import Rx from 'toy-rx'
import { bindContext } from '@utils'
Rx.Observable.from = require('@observables/from')

const partition = context => f => {
  const trueList = []
  const falseList = []

  context.subscribe({
    next: x =>
      f(x)
        ? trueList.push(x)
        : falseList.push(x)
  })

  return [
    Rx.Observable.from(trueList),
    Rx.Observable.from(falseList)
  ]
}

module.exports = bindContext(partition)
