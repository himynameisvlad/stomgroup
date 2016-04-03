import {itemTemplate} from './morePhotos.js';
import {LoadedAllPhotos} from './grids.js';
import {$photoLessBtn} from './grids.js';




export let loadMorePhotos = function (opts) {
  let $moreBtn = opts.btn;//$('.' + opts.grid + '__more-btn');
  let gridItems = $('.' + opts.grid + '__grid-item').size();
  let sourceArr = opts.arr;
  let result = '';
  

  if (opts.loadAll) {

    //load all items and hide less btn, if its photo grid
    sourceArr.forEach(function (e) {
      result += itemTemplate(e);
      if (opts.grid == 'photo') $photoLessBtn.addClass('hidden');
    });

  }else {
    //load opts.ppp items
    let page = $moreBtn.attr('data-page');
    let prevPage = page - 1;
    let ppp = opts.ppp;

    let slicedArr = sourceArr.slice(prevPage * ppp, page * ppp);

    slicedArr.forEach(function (e) {
      result += itemTemplate(e);
    });

    if (page * ppp > sourceArr.length) {
      $moreBtn.addClass('hidden');
    }else {
      $moreBtn.attr('data-page', ++page);
    }

  }

  let $newItems = $(result);

  //reload isotope with new items

  let $grid = $('.' + opts.grid + '__grid');

  $grid
            .isotope()
            .append($newItems)
            .isotope('appended', $newItems);
  $grid.imagesLoaded(function() {
    $grid.isotope();
  });
  
  if (opts.grid === 'photo' && $photoLessBtn.hasClass('hidden') && !opts.loadAll) $photoLessBtn.removeClass('hidden');
};
