import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.delay = require('@operators/delay')
Rx.Observable.prototype.delayWhen = require('@operators/delayWhen')

describe('delayWhen', () => {
  it('delayWhen test', done => {
    let expected = [0, 1, 2, 3, 4]

    const message = Rx.Observable.interval(10)

    const delayForSeconds = () => Rx.Observable.timer(20)

    const delayWhenExample = message.take(5).delayWhen(delayForSeconds)

    delayWhenExample.subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
