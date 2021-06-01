import SignIn from './sign-in';

import './sign-in.scss';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new SignIn();
});
