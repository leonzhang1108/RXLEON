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
    Rx.Observable.interval(20)
      .take(2)
      .debounce(() => Rx.Observable.timer(100))
      .mapTo('called once')
      .subscribe({
        next: x => assert.strictEqual(x, 'called once'),
        error: () => done('error should not be called'),
        complete: done
      })
  })
  it('debouceTime test', done => {
    Rx.Observable.interval(20)
      .take(2)
      .debounceTime(100)
      .mapTo('called once')
      .subscribe({
        next: x => assert.strictEqual(x, 'called once'),
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
