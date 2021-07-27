import HeadersFooters from './headers-footers';

utils.importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new HeadersFooters();
});
