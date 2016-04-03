import {anim} from './scroll';

export default function () {

	$('.gallery').each(function () { // the containers for all your galleries
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			removalDelay: 300,
			gallery:{
			enabled: true,
			navigationByClick: true,
			preload: [1, 3],
		},
		});
	});

	let $eqSlider = $('.equip__slider');
	let navArrows = [
				'<svg width="40" class="slider-arrows left-arrow" height="48">' +
				'<use xmlns:xlink="http://www.w3.org/1999/xlink"' +
				' xlink:href="assets/images/icons.svg#icon-larrows"></use></svg>',
				'<svg width="40" class="slider-arrows right-arrow" height="48">' +
				'<use xmlns:xlink="http://www.w3.org/1999/xlink" ' +
				'xlink:href="assets/images/icons.svg#icon-rarrows"></use></svg>',
			];
	let loadNavBg = function (nav) {
		let $this = nav;

		if (!$this.data('loaded')) {
			let navItems = nav.find('.avas').slice(12);
			navItems.each(function () {
				let $this = $(this);
				$this.css({ 'background-image': 'url(' + $this.data('bg') + ')' });
			});
		}

		$this.attr('data-loaded', true);
	};

	function toggleArrows(target) {
		var elm = target;

		if ($(elm).find('.owl-item').last().hasClass('active') &&
		$(elm).find('.owl-item.active').index() == $(elm).find('.owl-item').first().index()) {
			$(elm).find('.owl-next').addClass('off');
			$(elm).find('.owl-prev').addClass('off');
		}

		//disable next
		else if ($(elm).find('.owl-item').last().hasClass('active')) {
			$(elm).find('.owl-next').addClass('off');
			$(elm).find('.owl-prev').removeClass('off');
		}

		//disable previus
		else if ($(elm).find('.owl-item.active').index() == $(elm).find('.owl-item').first().index()) {
			$(elm).find('.owl-next').removeClass('off');
			$(elm).find('.owl-prev').addClass('off');
		}else {
			$(elm).find('.owl-next,.owl-prev').removeClass('off');
		}
	}

	//adds 'current' class to the thumbnail
	function addClassCurrent(index, owl) {
		owl
			.find('.owl-item')
			.removeClass('current')
			.eq(index).addClass('current');
	}

	//syncs positions. argument 'index' represents absolute position of the element
	function syncPosition(index, owl) {

		//PART 1 (adds 'current' class to thumbnail)
		addClassCurrent(index, owl);

		//PART 2 (counts position)

		var itemsNo = owl.find('.owl-item').length; //total items
		var visibleItemsNo = owl.find('.owl-item.active').length; //visible items

		//if all items are visible
		if (itemsNo === visibleItemsNo) {
			return 'stayStill';
		}

		//relative index (if 4 elements are visible and the
		//2nd of them has class 'current', returns index = 1)
		var visibleCurrentIndex = owl.find('.owl-item.active').index(owl.find('.owl-item.current'));

		//if it's first visible element and if there is hidden element before it
		if (visibleCurrentIndex == 0 && index != 0) {
			return index - 1;
		}

		//if it's last visible element and if there is hidden element after it
		if (visibleCurrentIndex == (visibleItemsNo - 1) && index != (itemsNo - 1)) {
			return index - visibleItemsNo + 2;
		}

		return 'stayStill';
	}

	$eqSlider
	.on('initialized.owl.carousel', function (e) {
		toggleArrows(e.target);
	})
	.owlCarousel({
		center: true,
		loop:true,
		nav: true,
		navText: navArrows,
		autoHeight: true,
		responsive:{
			320:{
				items:1,
			},
			520:{
				items:1,
			},
			768:{
				items:2,
			},
			960:{
				items:3,
			},
			1200:{
				items:3,
			},
		},
	})
	.on('translated.owl.carousel', function (event) {
		toggleArrows(event.target);
	})

	let $docSlider = $('.doc-slider');
	let $docSliderNav = $('.doc-slider-nav');
	let $testimSlider = $('.testim-slider');
	let $testimSliderNav = $('.testim-slider-nav');

	function setOwlStageHeight(event) {

	    let maxHeight = 0;
	    let thisHeight = $docSlider.find('.owl-item.active').height();

	    maxHeight=(maxHeight>=thisHeight?maxHeight:thisHeight);

	    $docSlider.css('height', thisHeight );
	    $docSlider.find('.owl-stage-outer').css('height', thisHeight ); // CORRECT DRAG-AREA SO BUTTONS ARE CLICKABLE
	};

	$docSlider
		.on('initialized.owl.carousel', function (e) {
			toggleArrows(e.target);
			setTimeout(setOwlStageHeight, 100);
		})
		.owlCarousel({
			lazyLoad:true,
			items: 1,
			dots: false,
			nav: true,
			navText: navArrows,
			autoHeight:true
		})
		.on('changed.owl.carousel', function (e) {
			var syncedPosition = syncPosition(e.item.index, $docSliderNav);

			if (syncedPosition != 'stayStill') {
				$docSliderNav.trigger('to.owl.carousel', [syncedPosition, 300, true]);
			}

		}).on('translated.owl.carousel', function (event) {
			toggleArrows(event.target);
			setOwlStageHeight(event);
		}).on('resize.owl.carousel', function (event) {
			setOwlStageHeight(event);
		});

	//thumbs
	let docNavCount = $docSliderNav.find('.item').length;
	let visibleDocNavItems = docNavCount >= 8 ? 8 : docNavCount;
	$docSliderNav
		.on('initialized.owl.carousel', function (e) {
			addClassCurrent(0, $docSliderNav);
			let navItems = $docSliderNav.find('.avas').slice(0, 12);
			navItems.each(function () {
				let $this = $(this);
				$this.css({ 'background-image': 'url(' + $this.data('bg') + ')' });
			});
		})
		.on('changed.owl.carousel', function (e) {
			loadNavBg($(this));
		})
		.owlCarousel({
				dots: false,
				items: 10,
				margin: 37,
				responsive:{
					320:{
						items:1,
					},
					520:{
						items:4,
					},
					768:{
						items:visibleDocNavItems - 2,
					},
					960:{
						items:visibleDocNavItems - 2,
					},
					1200:{
						items:visibleDocNavItems,
					},
				},
			})
			.on('click', '.owl-item', function () {
				$docSlider.trigger('to.owl.carousel', [$(this).index(), 300, true]);
				anim($docSlider.offset().top - 80);
			});

	$testimSlider
		.on('initialized.owl.carousel', function (e) {
			toggleArrows(e.target);
		})
		.owlCarousel({
			lazyLoad:true,
			items: 1,
			dots: false,
			nav: true,
			navText: navArrows,
			})
		.on('changed.owl.carousel', function (e) {
			var syncedPosition = syncPosition(e.item.index, $testimSliderNav);

			if ( syncedPosition != "stayStill" ) {
				$testimSliderNav.trigger('to.owl.carousel', [syncedPosition, 300, true]);
			}

		}).on('translated.owl.carousel', function (event) {
			toggleArrows(event.target);
		});

	//thumbs
	let testimNavCount = $testimSliderNav.find('.item').length;
	let visibleTestimNavItems = testimNavCount >= 8 ? 8 : testimNavCount;
	$testimSliderNav
		.on('initialized.owl.carousel', function (e) {
			addClassCurrent(0, $testimSliderNav);
			let navItems = $testimSliderNav.find('.testim-slider-nav__ava').slice(0, 12);
			navItems.each(function () {
				let $this = $(this);
				$this.css({ 'background-image': 'url(' + $this.data('bg') + ')' });
			});
		})
		.on('changed.owl.carousel', function (e) {
			loadNavBg($(this));
		})
		.owlCarousel({ //owl carousel init
			dots: false,
			items: 10,
			margin: 37,
			responsive:{
				320:{
					items:1,
				},
				520:{
					items:4,
				},
				768:{
					items:visibleTestimNavItems - 2,
				},
				960:{
					items:visibleTestimNavItems - 2,
				},
				1200:{
					items:visibleTestimNavItems,
				},
			},
		})
		.on('click', '.owl-item', function () {
			$testimSlider.trigger('to.owl.carousel', [$(this).index(), 300, true]);
			anim($testimSlider.offset().top - 80);
		});
}
