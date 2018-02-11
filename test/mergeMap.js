import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.range = require('@observables/range')
Rx.Observable.prototype.mergeMap = require('@operators/mergeMap')

describe('mergeMap', () => {
  it('mergeMap test', done => {
    const expected = [100, 101, 102, 200, 201, 202, 300, 301, 302]
    const letters = Rx.Observable.of(100, 200, 300)

    const result = letters.mergeMap(item =>
      Rx.Observable.range(item, 3)
    )

    result.subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
