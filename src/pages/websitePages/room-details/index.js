import RoomDetails from './room-details';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new RoomDetails();
});
