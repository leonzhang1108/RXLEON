import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.take = require('@operators/take')

describe('interval', () => {
  it('interval test', done => {
    const list = [0, 1, 2, 3, 4]
    const mutateFunction = x => x * x

    let expected = list.map(mutateFunction)

    Rx.Observable.interval(10).take(5).map(mutateFunction).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
