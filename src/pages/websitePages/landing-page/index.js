import LandingPage from './landing-page';

utils.importAll(require.context('../../../../src/', true, /\.scss$/));

$(document).ready(() => {
  new LandingPage();
});
