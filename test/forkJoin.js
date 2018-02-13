import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.forkJoin = require('@observables/forkJoin')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.delay = require('@operators/delay')

describe('forkJoin', () => {
  it('forkJoin test', done => {
    Rx.Observable.forkJoin(
      Rx.Observable.of('Leon'),
      Rx.Observable.of('Zhang').delay(100),
      Rx.Observable.interval(100).take(1),
      Rx.Observable.interval(10).take(10)
    ).subscribe({
      next: x => {
        assert.deepEqual(x, ['Leon', 'Zhang', 0, 9])
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
