module.exports = {
  bindContext: operator => function (f) {
    return operator(this)(f)
  }
}