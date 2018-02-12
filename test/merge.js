import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.range = require('@observables/range')
Rx.Observable.merge = require('@observables/merge')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.mergeAll = require('@operators/mergeAll')
Rx.Observable.prototype.mergeMap = require('@operators/mergeMap')

describe('merge', () => {
  it('merge test', done => {
    const expected = [1, 1, 1, 2, 1, 1]
    const first = Rx.Observable.interval(100)
    const second = Rx.Observable.interval(350)

    Rx.Observable.merge(
      first.mapTo(1),
      second.mapTo(2)
    ).take(6).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })

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
