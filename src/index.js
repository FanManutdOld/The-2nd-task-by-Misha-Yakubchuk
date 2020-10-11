function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/pages', true, /\.js$|\.scss$/));
