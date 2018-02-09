import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.fromArray = require('@observable/fromArray')
Rx.Observable.prototype.map = require('@operators/map')

describe('fromArray', () => {
  it('fromArray test', done => {
    const list = [1, 2, 3, 4]
    const mutateFunction = x => x * x

    let expected = list.map(mutateFunction)

    Rx.Observable.fromArray(list).map(mutateFunction).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
