import Cards from './cards';

utils.importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new Cards();
});
