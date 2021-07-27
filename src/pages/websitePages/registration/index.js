import Registration from './registration';

utils.importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new Registration();
});
