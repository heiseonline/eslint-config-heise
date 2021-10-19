module.exports = {
  hooks: {
    readPackage (pkg) {
      if (pkg.peerDependencies.eslint) {
        pkg.peerDependencies.eslint = '^8.0.0'
      }
      return pkg
    }
  }
}
