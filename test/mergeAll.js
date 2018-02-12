import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.range = require('@observables/range')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.mergeAll = require('@operators/mergeAll')

describe('mergeAll', () => {
  it('mergeAll test', done => {
    let expected = [0, 1, 2, 0, 1, 2, 0, 1, 2]

    Rx.Observable.interval(500)
      .take(3)
      .mapTo(0)
      .map(x => Rx.Observable.interval(30).take(3))
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
