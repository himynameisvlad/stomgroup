import carousel from './modules/carousels';
import swipe from './modules/swipe';
import panels from './modules/panels';
import forms from './modules/forms';
import {grids} from './modules/grids';
import {scrl} from './modules/scroll';

$(document).ready(function () {

  swipe();
  scrl();
  carousel();
  grids();
  panels();
  forms();

});
