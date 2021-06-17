import Cards from './cards';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new Cards();
});
