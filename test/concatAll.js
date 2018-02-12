import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.range = require('@observables/range')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.concatAll = require('@operators/concatAll')

describe('concatAll', () => {
  it('concatAll test', done => {
    let expected = [0, 1, 2, 0, 1, 2, 0, 1, 2]

    Rx.Observable.interval(100)
      .take(3)
      .mapTo(0)
      .map(x => Rx.Observable.range(x, 3))
      .concatAll()
      .subscribe({
        next: x => {
          console.log(x)
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
