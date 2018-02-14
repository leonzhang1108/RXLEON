import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.throw = require('@observables/throw')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.retry = require('@operators/retry')
Rx.Observable.prototype.catch = require('@operators/catch')
Rx.Observable.prototype.flatMap = require('@operators/flatMap')

describe('error', () => {
  it('throw test', done => {
    Rx.Observable.throw('this is an error')
      .subscribe({
        next: () => {},
        error: e => {
          assert.strictEqual(e, 'this is an error')
        },
        complete: done
      })
  })

  it('retry test', done => {
    let expected = [0, 1, 2, 0, 1, 2, 'error']

    Rx.Observable.interval(10)
      .flatMap(val =>
        val > 2
          ? Rx.Observable.throw('error')
          : Rx.Observable.of(val)
      )
      .retry(2)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: e => {
          assert.strictEqual(e, expected.shift())
        },
        complete: done
      })
  })

  it('catch test', done => {
    Rx.Observable.throw('this is an error')
      .catch(val => Rx.Observable.of(`I caught: ${val}`))
      .subscribe({
        next: x => {
          assert.strictEqual(x, 'I caught: this is an error')
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
