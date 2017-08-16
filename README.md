# Observable Path Store
A key value observable pathed store

``` js
var store = new ObservablePathStore()
store.modify('animals.cats', 'Felix')
store.modify('animals.dogs', 'Sultan')
assert.equal(store.get('animals.dogs'), 'Sultan')
store.subscribe('animals', (value) => {
  assert.equal(value, 'Felix')
  done()
})
store.fire('animals.cats')
```


## How to inherit

It is usually better to use composition but if prefer you can inherit the
class

```js
class A extends ObservablePathStore {
}
var store = new A()
store.modify('animals', 'Animals')
assert(store.get('animals'), 'Animals')
```

## Public API

```js
ObservablePathStore.prototype = {
  subscribe: function (path, fn) {},
  unsubscribe: function (path, fn) {},
  fire: function (path) {},
  modify: function (path, value, fire = false) {},
  get: function (path) {}
}
```
