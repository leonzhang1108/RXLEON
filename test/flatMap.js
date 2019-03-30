import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.of = require('@observables/of')
Rx.Observable.range = require('@observables/range')
Rx.Observable.prototype.flatMap = require('@operators/flatMap')

describe('flatMap', () => {
  it('flatMap test', done => {
    const expected = [10, 11, 12, 20, 21, 22, 30, 31, 32]

    Rx.Observable
      .of(10, 20, 30)
      .flatMap(item => Rx.Observable.range(item, 3))
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
