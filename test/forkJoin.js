import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.empty = require('@observables/empty')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.forkJoin = require('@observables/forkJoin')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.delay = require('@operators/delay')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')

describe('forkJoin', () => {
  it('forkJoin test', done => {
    Rx.Observable.forkJoin(
      Rx.Observable.empty().mapTo('Leon'),
      Rx.Observable.empty().mapTo('Zhang').delay(100),
      Rx.Observable.interval(100).take(1),
      Rx.Observable.interval(10).take(10)
    ).subscribe({
      next: x => {
        assert.deepStrictEqual(x, ['Leon', 'Zhang', 0, 9])
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
