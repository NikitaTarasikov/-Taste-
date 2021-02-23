function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
$(function () {


	//<Меню>=========================================================================================
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.header__link').on('click', function () {
		$('.header__burger,.header__menu').removeClass('active');
		$('body').removeClass('lock');
	});



	//<Меню>=========================================================================================
	//<Табы>=========================================================================================
	$('.tab').on('click', function (e) {
		e.preventDefault(); //выключает ссылку
		$($(this).siblings()).removeClass('tab--active');
		$($(this).parent().siblings().find('div')).removeClass('tabs-content--active');

		$(this).addClass('tab--active');
		$($(this).attr('href')).addClass('tabs-content--active');
	});
});
//<Табы>=========================================================================================
//<Фильтрация портфолио>=========================================================================================
$(document).ready(function () {
	$('.button[filter]').click(function () {
		$('.portfolio__filter-item').removeClass('portfolio__filter-item--normalize');
		if ($(this).attr('filter') == 'all') {
			if ($(this).attr('val') == 'off') {
				$('.button[filter]').attr('val', 'off');
				$('.filter > div').show(400);
			}
		} else {
			$('.portfolio__filter-item').addClass('portfolio__filter-item--normalize');
			if ($(this).attr('val') == 'off') {
				$('.button[filter]').attr('val', 'off');
				$(this).attr('val', 'on');
				$('.filter > div').hide(400);
				var filter = $(this).attr('filter');
				$('.filter > div[filter=' + filter + ']').show(400);
			}
		}
		if ($('.portfolio__btn-item').hasClass('portfolio__filter-item--normalize')) {

			$(this).addClass('portfolio__btn-item--active');
		} else {
			$('.portfolio__btn-item').removeClass('portfolio__btn-item--active');
		}

		if ($('.portfolio__btn-item').attr('val', 'off')) {
			$('.portfolio__btn-item').removeClass('portfolio__btn-item--active');
			$(this).addClass('portfolio__btn-item--active');
		} else {
			$('.portfolio__btn-item').removeClass('portfolio__btn-item--active');
		}

	});
	//<Фильтрация портфолио>=========================================================================================
	//<Прогресс бар линия>=========================================================================================
	$(".expertise__content-per").each(function () {
		$this = $(this);
		var per = $(this).attr("per");
		$this.css("width", per + "%");
		$this.find(".expertise__content-value").text(per + "%").css("opacity", "1");
	});
	//<Прогресс бар линия>=========================================================================================
	//<Слайдера>=========================================================================================

	new Swiper('.team-slider', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	new Swiper('.testimonials-slider', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	new Swiper('.new-slider', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			651: {
				direction: 'vertical',
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			}
		}
	});
	//<Слайдера>=========================================================================================



	//<Круглый прогресс бар>=========================================================================================
	$(".circle__percent").each(function () {
		var $this = $(this),
			$dataV = $this.data("percent"),
			$dataDeg = $dataV * 3.6,
			$round = $this.find(".round__per");
		$round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
		$this.append('<div class="circle__inbox"><span class="percent__text"></span></div>');
		$this.prop('Counter', 0).animate({ Counter: $dataV },
			{
				duration: 2000,
				easing: 'swing',
				step: function (now) {
					$this.find(".percent__text").text(Math.ceil(now) + "%");
				}
			});
		if ($dataV >= 51) {
			$round.css("transform", "rotate(" + 360 + "deg)");
			setTimeout(function () {
				$this.addClass("percent__more");
			}, 1000);
			setTimeout(function () {
				$round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
			}, 1000);
		}
	});
});
//<Круглый прогресс бар>=====================================================================================
//<якоря меню>=====================================================================================
function slowScroll(id) {
	var offset = 0;
	$('html, body').animate({
		scrollTop: $(id).offset().top - offset
	}, 900);
	return false;
}
//<якоря меню>=====================================================================================
//<анимация>=====================================================================================
const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('anim-active');
			} else {
				if (!animItem.classList.contains('anim-no-hide')) {
					animItem.classList.remove('anim-active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollleft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	setTimeout(() => {
		animOnScroll();
	}, 350);

}
//<анимация>=====================================================================================
//<Липкое меню при скроле>=====================================================================================
$(function () {
	var header = $(".header__top"),
		introH = $(".header__content").innerHeight(),
		scrollOffset = $(window);

	checkScroll(scrollOffset);

	$(window).on("scroll", function () {
		scrollOffset = $(this).scrollTop();

		checkScroll(scrollOffset);


	});
	function checkScroll(scrollOffset) {
		if (scrollOffset >= introH) {
			header.addClass("sticky");
		} else {
			header.removeClass("sticky")
		}
	}
});
//<Липкое меню при скроле>=====================================================================================
