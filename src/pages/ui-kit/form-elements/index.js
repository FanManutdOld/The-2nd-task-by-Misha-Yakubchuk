import FormElements from './form-elements';

utils.importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new FormElements();
});
