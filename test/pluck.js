import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.from = require('@observables/from')
Rx.Observable.prototype.plunk = require('@operators/plunk')

describe('pluck', () => {
  it('pluck test', done => {
    let expected = ['Batman', 'Deathstroke']

    Rx.Observable.from([{
      name: 'Bruce Wayne',
      alias: 'Batman'
    }, {
      name: 'Slade Wilson',
      alias: 'Deathstroke'
    }]).plunk('alias').subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
