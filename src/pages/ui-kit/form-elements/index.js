import FormElements from './form-elements';
import '../../../favicon/favicon';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new FormElements();
});
