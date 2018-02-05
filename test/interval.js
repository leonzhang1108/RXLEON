import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observable/interval')
Rx.Observable.prototype.map = require('@operators/map')

describe('interval', () => {
  it('should support a basic use case', done => {
    const list = [0, 1, 2, 3, 4]
    const mutateFunction = x => x * x

    let expected = list.map(mutateFunction)

    const subscription = Rx.Observable.interval(100).map(mutateFunction).subscribe({
      next: x => {
        console.log(x)
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: () => {}
    })

    setTimeout(() => {
      subscription.unsubscribe()
      done()
    }, 510)
  })
})
