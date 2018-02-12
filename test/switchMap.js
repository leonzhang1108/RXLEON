import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.switchMap = require('@operators/switchMap')

describe('switchMap', () => {
  it('switchMap test', done => {
    let expected = [0, 1, 0, 1, 2, 3, 4]

    Rx.Observable.interval(50)
      .take(2)
      // 第一次100秒后断掉重新来
      // 第二次走完
      .switchMap(() => Rx.Observable.interval(20).take(3))
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
