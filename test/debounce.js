import Rx from 'rxjs'
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.debounce = require('@operators/debounce')
Rx.Observable.prototype.debounceTime = require('@operators/debounceTime')

describe('debouce', () => {
  it('debouce test', done => {
    Rx.Observable.interval(20)
      .take(2)
      .debounce(() => Rx.Observable.timer(100))
      .subscribe({
        next: x => {
          console.log('you shall not come')
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
  it('debouceTime test', done => {
    Rx.Observable.interval(50)
      .take(2)
      .debounceTime(90)
      .subscribe({
        next: x => {
          console.log('you shall not come')
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
