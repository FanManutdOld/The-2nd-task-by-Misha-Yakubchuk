import RoomDetails from './room-details';

utils.importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new RoomDetails();
});
