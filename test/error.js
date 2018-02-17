import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.throw = require('@observables/throw')
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.do = require('@operators/do')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.delay = require('@operators/delay')
Rx.Observable.prototype.retry = require('@operators/retry')
Rx.Observable.prototype.catch = require('@operators/catch')
Rx.Observable.prototype.flatMap = require('@operators/flatMap')
Rx.Observable.prototype.delayWhen = require('@operators/delayWhen')
Rx.Observable.prototype.retryWhen = require('@operators/retryWhen')

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

  // it('retryWhen test', done => {
  //   Rx.Observable.interval(100).map(val => {
  //     if(val > 2) {
  //       throw val
  //     } else {
  //       return val
  //     }
  //   })
  //   .retryWhen(errors =>
  //     errors
  //       .do(val => console.log(`Value ${val} was too high!`))
  //       .delayWhen(val => Rx.Observable.timer(1000))
  //       // .delay(1000)
  //   ).subscribe({
  //     next: x => {
  //       console.log(x)
  //     },
  //     error: e => {
  //       console.log(e)
  //     },
  //     complete: done
  //   })
  // })

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
