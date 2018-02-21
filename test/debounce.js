import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.debounce = require('@operators/debounce')
Rx.Observable.prototype.debounceTime = require('@operators/debounceTime')

describe('debouce', () => {
  it('debouce test', done => {
    let expected = ['click', 'click']

    Rx.Observable.interval(1)
      .mapTo('click')
      .debounce(() => Rx.Observable.timer(200))
      .take(2)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
  it('debouceTime test', done => {
    let expected = ['click', 'click']

    Rx.Observable.interval(10)
      .mapTo('click')
      .debounceTime(100)
      .take(2)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
