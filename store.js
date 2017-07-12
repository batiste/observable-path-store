function ObservablePathStore () {
  this.suscribers = []
  this.paths = {}
  this.store = {}
}

ObservablePathStore.prototype = {
  subscribe: function (path, fn) {
    var _path = this.paths[path] || []
    _path.push(fn)
    this.paths[path] = _path
  },

  unsubscribe: function (path, fn) {
    this.paths[path] = this.paths[path].filter((el) => { return el !== fn })
  },
  fire: function (path) {
    Object.keys(this.paths).forEach((_path) => {
      if (path.indexOf(_path) === 0) {
        this.paths[_path].forEach(el => {
          el.call(this, this.store[path], path)
        })
      }
    })
  },
  modify: function (path, value, fire = false) {
    this.store[path] = value
    if (fire) {
      this.fire(path)
    }
    return this
  },
  get: function (path) {
    return this.store[path]
  }
}

module.exports = {
  ObservablePathStore
}
