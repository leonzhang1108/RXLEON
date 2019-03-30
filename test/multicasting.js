import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.do = require('@operators/do')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.share = require('@operators/share')
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

    const complete = () => expected.length === 0 && done()

    multi.subscribe({ next, error, complete })

    multi.subscribe({ next, error, complete })

    multi.connect()
  })

  it('publish test', done => {
    let expected = [
      'first: 0',
      'second: 0',
      'first: 1',
      'second: 1',
      'first: 2',
      'first: 3'
    ]

    const next = x => assert.strictEqual(x, expected.shift())

    const source = Rx.Observable.interval(20)
      .do(() => console.log('ironman sucks'))
      .publish().refCount()

    const error = () => done('error should not be called')

    const complete = () => expected.length === 0 && done()

    source.take(4).map(v => `first: ${v}`).subscribe({ next, error, complete })

    source.take(2).map(v => `second: ${v}`).subscribe({ next, error, complete })
  })

  it('share test', done => {
    let expected = [
      'ALL HAiL JLA',
      'ALL HAiL JLA'
    ]

    const source = Rx.Observable.timer(100)
      .do(() => console.log('ironman sucks'))
      .mapTo('ALL HAiL JLA').share()

    const next = x => assert.strictEqual(x, expected.shift())

    const error = () => done('error should not be called')

    const complete = () => expected.length === 0 && done()

    source.subscribe({ next, error, complete })

    source.subscribe({ next, error, complete })
  })
})
