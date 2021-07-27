import SearchRoom from './search-room';

utils.importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new SearchRoom();
});
