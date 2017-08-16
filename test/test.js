var ObservablePathStore = require('../store').ObservablePathStore
var assert = require('assert')

describe('store', function () {
 it('fires things properly', function (done) {
    var store = new ObservablePathStore()
    store.subscribe('animals', (value) => {
      done()
    })
    store.fire('animals')
  })
  it('children trigger parent path', function (done) {
    var store = new ObservablePathStore()
    store.subscribe('animals', (value) => {
     done()
    })
    store.fire('animals.cats')
  })
  it('children trigger parent path and contains the right value', function (done) {
    var store = new ObservablePathStore()
    store.modify('animals.cats', 'Felix')
    store.modify('animals.dogs', 'Sultan')
    store.subscribe('animals', (value) => {
      assert.equal(value, 'Felix')
      done()
    })
    store.fire('animals.cats')
  })
  it('no value for not listening to children', function (done) {
    var store = new ObservablePathStore()
    store.modify('animals.dogs', 'Sultan')
    store.subscribe('animals', (value) => {
      assert.equal(value, undefined)
      done()
    })
    store.fire('animals.cats')
  })
  it('no value for not listening to children without value', function (done) {
    var store = new ObservablePathStore()
    store.modify('animals.dogs', 'Sultan')
    store.subscribe('animals.cats', (value) => {
      assert.equal(value, undefined)
      done()
    })
    store.fire('animals.cats')
  })
  it('simple trigger', function (done) {
    var store = new ObservablePathStore()
    store.modify('animals', 'Animals')
    store.subscribe('animals', (value) => {
      assert.equal(value, 'Animals')
      done()
    })
    store.fire('animals')
  })
  it('value storage', function () {
    var store = new ObservablePathStore()
    store.modify('animals', 'Animals')
    assert(store.get('animals'), 'Animals')
  })
  it('can be inherited usign old method', function () {
    function A () {
      ObservablePathStore.call(this)
    }
    A.prototype = ObservablePathStore.prototype
    var store = new A()
    store.modify('animals', 'Animals')
    assert(store.get('animals'), 'Animals')
  })
  it('can be inherited using extend', function () {
    class A extends ObservablePathStore {
    }
    var store = new A()
    store.modify('animals', 'Animals')
    assert(store.get('animals'), 'Animals')
  })
})
