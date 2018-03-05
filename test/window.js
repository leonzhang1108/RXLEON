import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.scan = require('@operators/scan')
Rx.Observable.prototype.window = require('@operators/window')
Rx.Observable.prototype.mergeAll = require('@operators/mergeAll')

describe('window', () => {
  it('window test', done => {
    let expected = [0, 1, 0, 1]

    Rx.Observable.interval(50)
      .window(Rx.Observable.interval(10).take(2))
      .mergeAll()
      .take(4)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
