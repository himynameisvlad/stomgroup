export let anim = function (pos) {
	$('html, body').stop().animate({ scrollTop: pos }, 800);
}

export let scrl = function () {

	$('a[href^="."]').click(function () {
		let $this = $(this);
		let scrollEl = $(this).attr('href');
		let toPosition = $(scrollEl).offset().top - 70;

		//if (scrollEl == '.calc') toPosition = $(scrollEl).offset().top - 200;

		if ($this.hasClass('main-menu__link')) {
			$('.cd-panel').removeClass('is-visible');
			$('.main-menu__link.active').removeClass('active');
		}

		if ($(scrollEl).length != 0) {
			anim(toPosition);
		}

		return false;
	});

	//fixed header
	let $topBar = $('.top-bar');
	let $header = $('.header');
	$header.after($topBar.clone().addClass('animateIt'));

	$(window).on('scroll', function () {
		let headerHeight = $header.height();
		$header.toggleClass('down', ($(window).scrollTop() > headerHeight));
	});

};
