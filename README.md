# observable-path-store
A key value observable pathed store

    var store = new ObservablePathStore()
    store.modify('animals.cats', 'Felix')
    store.modify('animals.dogs', 'Sultan')
    store.subscribe('animals', (value) => {
      assert.equal(value, 'Felix')
      done()
    })
    store.fire('animals.cats')
