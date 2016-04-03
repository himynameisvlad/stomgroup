import {anim} from './scroll.js';

export default function () {

  let bindPanelsEvents = function (buttons) {
    buttons.forEach(i => {

      let $item = $('.' + i + '-panel-anchor');

      $item.on('click', function (e) {
        e.preventDefault();
        let $this = $(this)
        let fromData = $this.data('from');

        if ($this.hasClass('prices-list__link')) {
          fromData = 'Список цен. ' + $this.closest('li').find('p').text();
        }
        if ($this.hasClass('.main-menu__link')) {
          $('.cd-panel.is-visible').removeClass('is-visible');
          $this.toggleClass('active');
        }

        let $panel = $('.' + i + '-panel');
        let fromInput = $panel.find('input[name="from"]');
        fromInput.val(fromData);
        $panel.addClass('is-visible');
      });

    });

  };

  $('.top-bar__menu-anchor').on('click', function (e) {
    e.preventDefault();
    $('.menu-panel').addClass('is-visible');
  });

  bindPanelsEvents(
    ['sign', 'admin', 'cost', 'servey', 'doc',
    'brochure', 'advice', 'testim', 'callback',
    'credit', 'services', 'why', 'stom', 'recept', 'law',
    'sale']);

  //prices panels
  let $menuLinks  = $('.service__menu-link');
  let $morePrices = $('.more-prices');

  $menuLinks.on('click', function (e) {
    e.preventDefault();

    let $this = $(this);
    let trigger = $this.data('trig');

    if (!$this.hasClass('active') || !$this.hasClass('mob')) {
      $('.service__panel.toggled').animate({opacity: 0}, 300).removeClass('toggled mob');

      $('.service__menu-link.active').removeClass('active mob');
      let $panel = $('.service__panel-' + trigger);

      $panel.animate({opacity: 1}, 300).addClass('toggled').delay(1000).addClass('mob');
      $this.addClass('active mob');
    }
  });

  let showLessBtn = function (curHeight, btn) {
    if (curHeight == 200 && btn.hasClass('hidden')){
      btn.removeClass('hidden');
    }
  };

  $(document).on('click', '.more-prices', function (e) {
    e.preventDefault();

    let $this = $(this);
    let $lessBtn = $this.next();
    let $priceList = $this.parent('.service__panel-block').find('.prices-list');
    let curHeight = $priceList.height();
    let autoHeight = $priceList.css('height', 'auto').height();
    if (curHeight == 200 && $lessBtn.hasClass('hidden')){
      $lessBtn.removeClass('hidden');
    }
    if (autoHeight - curHeight <= 400) {
      $priceList.height(curHeight).animate({ 'height': autoHeight, duration: 100 }, showLessBtn(curHeight, $lessBtn));
      $this.addClass('hidden');
    }else{
      $priceList.height(curHeight).animate({ 'height': curHeight + 400, duration: 100 }, showLessBtn(curHeight, $lessBtn));
    }
  });

  $(document).on('click', '.less-prices', function (e) {
    e.preventDefault()

    let $this = $(this);
    let $moreBtn = $this.prev();
    let $priceList = $this.parent('.service__panel-block').find('.prices-list');
    let curHeight = $priceList.height();

    $priceList.height(curHeight).animate({ 'height': 200, duration: 100 });

    if ($moreBtn.hasClass('hidden')) $moreBtn.removeClass('hidden');

    anim($priceList.offset().top -100);

    $this.addClass('hidden');

  });

  //auto panel

  let $autoModal = $('.auto-modal');
  let $autoYesBtn = $('.auto-modal__form-yes');
  let $autoCloseBtn = $('.auto-modal__form-close');
  let $autoForm = $('.auto-modal__form-self');
  let $autoVars = $('.auto-modal__form-vars');
  let $autoHeader = $('.auto-modal__header').find('h5');
  let $body = $('body');

  let showAutoMOdal = function () {
    if(!$('.cd-panel').hasClass('is-visible') && !$body.hasClass('auto-showed')) {
      $body.addClass('auto-visible auto-showed');
    }
  }

  setTimeout(showAutoMOdal, 20000);

  $autoModal.on('click', function(e) {
    e.preventDefault();

    if ($(e.target).is('.auto-modal__form-close') ||
    $(e.target).is('.auto-modal')) {
      $body.removeClass('auto-visible');
    }
    
  });

  $autoYesBtn.on('click', function(e) {
    e.preventDefault();
    $autoForm.removeClass('hidden');
    $autoHeader.text('Перезвоним за 1 минуту и рассчитаем стоимость для Вашей ситуации');
    $autoVars.hide();
  })

  $('.cd-panel').on('click', function (event) {
    let $this = $(this);
    if ($(event.target).is('.cd-panel') ||
    $(event.target).is('.cd-panel-close') ||
    $(event.target).is('.back-btn')) {
      $this.removeClass('is-visible');
      $('.main-menu__link.active').removeClass('active');
      setTimeout(showAutoMOdal, 20000);
      event.preventDefault();
    }

  });

  $('.service-close').on('click', function (event) {
    $('.service__panel.toggled.mob').removeClass('toggled mob');
    event.preventDefault();
  });

}
