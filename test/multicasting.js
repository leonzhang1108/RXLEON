import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.do = require('@operators/do')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.publish = require('@operators/publish')
Rx.Observable.prototype.refCount = require('@operators/refCount')
Rx.Observable.prototype.multicast = require('@operators/multicast')

describe('multicasting', () => {
  it('multicast test', done => {
    const expected = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]

    const source = Rx.Observable.interval(20).take(5)
    
    const multi = source.multicast(new Rx.Subject())

    const next = x => assert.strictEqual(x, expected.shift())

    const error = () => done('error should not be called')

    multi.subscribe({ next, error, complete: done })

    multi.subscribe({ next, error })

    multi.connect()
  })

  // it('publish test', done => {

  //   let expected = [
  //     'first: 0',
  //     'second: 0',
  //     'first: 1',
  //     'second: 1'
  //   ]

  //   const next = x => {
  //     console.log(x)
  //     // assert.strictEqual(x, expected.shift())
  //   }

  //   const source = Rx.Observable.interval(20)
  //     .do(() => console.log('do something'))
  //     .publish().refCount()

  //   const error = () => done('error should not be called')

  //   const complete = done

  //   const first = source.take(2).map(v => `first: ${v}`).subscribe({
  //     next, error, 
  //   })

  //   const second = source.take(2).map(v => `second: ${v}`).subscribe({
  //     next, error, 
  //   })
    
  //   // source.connect()
  // })

  // it('share test', done => {

  //   const createObserver = tag => ({
  //     next: x => `${tag} ${x}`,
  //     error: () => done('error should not be called'),
  //     complete: done
  //   })

  //   const published = Rx.Observable.interval(10).take(2)
  //     .do(() => console.log('side effect'))
  //     .publish().refCount()

  //   published.subscribe(createObserver('SourceA'))
  //   published.subscribe(createObserver('SourceB'))
  // })
})
