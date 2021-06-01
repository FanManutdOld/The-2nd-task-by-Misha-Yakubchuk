import SearchRoom from './search-room';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new SearchRoom();
});
