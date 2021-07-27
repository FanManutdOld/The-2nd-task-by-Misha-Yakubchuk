import SignIn from './sign-in';

utils.importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new SignIn();
});
