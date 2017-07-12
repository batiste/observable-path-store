# observable-path-store
A key value observable pathed store

``` js
    var store = new ObservablePathStore()
    store.modify('animals.cats', 'Felix')
    store.modify('animals.dogs', 'Sultan')
    store.subscribe('animals', (value) => {
      assert.equal(value, 'Felix')
      done()
    })
    assert.equal(store.get('animals.dogs'), 'Sultan')
    store.fire('animals.cats')
```
