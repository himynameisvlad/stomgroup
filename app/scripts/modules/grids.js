import {photos} from './morePhotos.js';
import {achievs} from './morePhotos.js';
import {loadMorePhotos} from './loadMore';
import {anim} from './scroll.js';

let gridContent = {
  photo: photos,
  achievs: achievs,
};

let LoadedAllPhotos = false;
let LoadedAllCertif = false;

export let $photoLessBtn = $('.photo__less-btn');
let $photoMoreBtn = $('.photo__more-btn ');

$photoLessBtn.on('click', function (e) {
  e.preventDefault();

  //$photoGrid.isotope({ filter: '.default-item' });
  $photoGrid.isotope( 'remove', $('.new-item') )
    .isotope('layout');
  anim($photoGrid.offset().top);
  $(this).addClass('hidden');
  if($photoMoreBtn.hasClass('hidden')) {
    $photoMoreBtn.removeClass('hidden');
  }
  $photoMoreBtn.attr('data-page', 1);
  LoadedAllPhotos = false;
})

export let $photoGrid = $('.photo__grid');

export const grids = function () {

  let $achievsGrdi = $('.achievs__grid');
  let defaultPhotos = $photoGrid.find('.photo__grid-item').clone();

  //$('.image-link').magnificPopup({ type:'image' });

  let filterGrid = function (grids) {
    grids.forEach(function (grid) {
      $('.' + grid + '__grid-nav').find('a').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        let filterBy = $this.data('filter');
        let filterData = $this.data('filter');
        let $moreBtn = $('.' + grid + '__more-btn');
        let opts = {
          grid: grid,
          arr: gridContent[grid],
          loadAll: true,
        };

        if (!LoadedAllPhotos && grid === 'photo' && filterBy !== '*') {
          loadMorePhotos(opts);
          LoadedAllPhotos = true;
        }else if(grid === 'photo' && filterBy === '*'){

          if ($moreBtn.hasClass('hidden')) $moreBtn.removeClass('hidden');

          $photoGrid.isotope( 'remove', $('.new-item') ).isotope('layout').isotope({ filter: '*' });

          $photoMoreBtn.attr('data-page', 1);
          LoadedAllPhotos = false;
          $('.' + grid + '__grid-nav').find('a').removeClass('active');
          $this.addClass('active');
          return false;

        }

        if (!LoadedAllCertif && grid === 'achievs') {
          loadMorePhotos(opts);
          LoadedAllCertif = true;
        }

        if (!$moreBtn.hasClass('hidden')) $moreBtn.addClass('hidden');


        $('.' + grid + '__grid-nav').find('a').removeClass('active');
        $this.addClass('active');
        $('.' + grid + '__grid').isotope({ filter: filterData });
      });
    });
  };

  $photoGrid.imagesLoaded(function () {
    $photoGrid.isotope({
      // options
      itemSelector: '.photo__grid-item',
      percentPosition: true,
      layoutMode: 'fitRows',
      masonry: {
        columnWidth: '.photo-sizer'
      }
    });
  });

  $achievsGrdi.imagesLoaded(function () {
    $achievsGrdi.isotope({
      // options
      itemSelector: '.achievs__grid-item',
      masonry: {
        columnWidth: 10,
        isFitWidth: true,
      },
      masonryHorizontal: {
        rowHeight: 1060
      }
    });
  });

  let $photoMoreBtn = $('.photo').find('.more-btn');
  let $achMoreBtn = $('.achievs').find('.more-btn');

  $photoMoreBtn.on('click', function (e) {
    e.preventDefault();

    let $this = $(this);
    let photoOpts = {
      grid: 'photo',
      btn: $this,
      ppp: 3,
      arr: gridContent.photo,
      loadAll: false,
    };
    loadMorePhotos(photoOpts);
  });

  $achMoreBtn.on('click', function (e) {
    e.preventDefault();

    let $this = $(this);
    let photoOpts = {
      grid: 'achievs',
      btn: $this,
      ppp: 6,
      arr: gridContent.achievs,
      loadAll: false,
    };
    loadMorePhotos(photoOpts);
  });

  filterGrid(['photo', 'achievs']);


  //magnific popups
  let magnificOpts = {
    delegate: 'a.image-link',
    type: 'image',
    removalDelay: 300,
    gallery:{
      enabled: true,
      navigationByClick: true,
      preload: [1, 3],
    },
  }

  $('.photo__grid').magnificPopup(magnificOpts);

  $('.achievs__grid').magnificPopup(magnificOpts);

  $('.testim-slider').magnificPopup(magnificOpts);

};
