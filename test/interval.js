import assert from 'assert'
import Rx from '@core'
import interval from '@observable/interval'
Rx.Observable.interval = interval

describe('interval', () => {
  it('should support a basic use case', done => {
    const list = [0, 1, 2, 3, 4]
    const mutateFunction = x => x * x

    let expected = list.map(mutateFunction)

    const subscription = Rx.Observable.interval(100).map(mutateFunction).subscribe({
      next: x => assert.strictEqual(x, expected.shift()),
      error: () => done('error should not be called'),
      complete: () => {}
    })

    setTimeout(() => {
      subscription.unsubscribe()
      done()
    }, 510)
  })
})
