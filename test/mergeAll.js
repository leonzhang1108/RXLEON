import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.range = require('@observables/range')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.mergeAll = require('@operators/mergeAll')

describe('mergeAll', () => {
  it('mergeAll test', done => {
    let expected = [0, 1, 2, 1, 2, 3, 2, 3, 4]

    Rx.Observable.range(0, 3)
      .map(x => Rx.Observable.range(x, 3))
      .mergeAll()
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
