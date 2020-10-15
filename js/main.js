
// objectFitImages(); 


//сбрасываем :focus при клике, но оставляем с клавиатуры

(function () {
	var button = document.querySelectorAll('a, button, label, input');

	var isMouseDown = false;
	var isLabel = false;

	for (var i = 0; i < button.length; i++) {
		var el = button[i];
		el.classList.add('focus');

		el.addEventListener('mousedown', function () {
			this.classList.remove('focus');
			isMouseDown = true;
			if (this.tagName == 'LABEL') {
				isLabel = true;
			}
		});
		el.addEventListener('mouseup', function () {
			if (this.tagName == 'LABEL') {
				isLabel = false;
			}
		});
		el.addEventListener('keydown', function (e) {
			if (e.key === "Tab") {
				isMouseDown = false;
			}
		});
		el.addEventListener('focus', function () {
			if (isMouseDown) {
				this.classList.remove('focus');
			}
		});
		el.addEventListener('blur', function () {
			if (this.type === 'checkbox') {
				if (!isLabel) {
					var check = document.querySelector('[for="' + this.id + '"]');
					check.classList.add('focus');
				}
			} else {
				this.classList.add('focus');
			}
		});
	}
}());




/* кнопка плавной прокрутки вверх */

(function () {
  var btn_up = document.querySelector('[data-up]');

  function scrollUp() {
    window.scrollBy(0, -80);

    if (window.pageYOffset > 0) {
      requestAnimationFrame(scrollUp);
    }
  }

  var lastScrollPos = 0;
  var start = true;

  function showBtnUp() {
    if (start) {
      start = false;

      setTimeout(function () {
        var scrollPos = window.pageYOffset;

        if (scrollPos > 600 && scrollPos < lastScrollPos) {
          btn_up.classList.add('show');
        } else {
          btn_up.classList.remove('show');
        }
        lastScrollPos = scrollPos;
        start = true;
      }, 200);
    }
  }

  if (btn_up) {
    btn_up.addEventListener('click', scrollUp);
    document.addEventListener('scroll', showBtnUp);
  }
}());



{/* <button class="btn_up" data-up aria-label="наверх">
  <svg class="icon icon_arrow_up">
    <use xlink:href="#icon-arrow"></use>
  </svg>
</button> */}

// .btn_up {
//   position: fixed;
//   right: 20px;
//   bottom: 20px;
//   z-index: 5;
//   display: none;
//   width: 30px;
//   height: 30px;
//   border: 1px solid rgb(236, 188, 56);
//   border-radius: 5px;
//   background-color: #72635c;
// }

// @media (min-width: 768px) {
//   .btn_up {
//     position: absolute;
//     left: 30px;
//     display: block;
//     border: none;
//     background-color: transparent;
//   }
// }

// .show {
//   display: block;
// }

// .icon_arrow_up {
// 	color: #fff;
// 	width: 30px;
// 	height: 30px;
//   transform: rotate(-180deg);
// }




// document.querySelector('.nav__burger').onclick = function () {
// 	this.classList.toggle('active');
// 	document.querySelector('.nav').classList.toggle('active');
// 	document.querySelector('body').classList.toggle('lock');
// }




function scrollMenu(nav, offset, speed, easing) {

	var menu = document.querySelector(nav);
	var menuHeight;
	if (offset) { 
		var head = document.querySelector(offset);

		if (head) { 
			menuHeight = head.clientHeight;
		} else {
			menuHeight = 0;
		}
	} else {
		menuHeight = 0;
	}

	function fncAnimation(callback) {
		window.setTimeout(callback, 1000 / 60);
	};

	window.requestAnimFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || fncAnimation;
	}();


	function scrollToY(height, speed, easing) {
		var scrollTargetY = height || 0;
		scrollTargetY += 2;
		var speed = speed || 2000;
		var easing = easing || 'easeOutSine';

		var scrollY = window.pageYOffset;
		var currentTime = 0;
		var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

		var easingEquations = {
			easeOutSine: function easeOutSine(pos) {
				return Math.sin(pos * (Math.PI / 2));
			},
			easeInOutSine: function easeInOutSine(pos) {
				return -0.5 * (Math.cos(Math.PI * pos) - 1);
			},
			easeInOutQuint: function easeInOutQuint(pos) {
				/* eslint-disable-next-line */
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}
				return 0.5 * (Math.pow(pos - 2, 5) + 2);
			}
		};

		function tick() {
			currentTime += 1 / 60;
			var p = currentTime / time;
			var t = easingEquations[easing](p);

			if (p < 1) {
				window.requestAnimFrame(tick);
				window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
			} else {
				window.scrollTo(0, scrollTargetY);
			}
		}

		tick();
	};


	function menuControl(menu) {
		var i = void 0;
		var currLink = void 0;
		var refElement = void 0;
		var links = menu.querySelectorAll('a[href^="#"]');
		var scrollY = window.pageYOffset;


		for (i = 0; i < links.length; i += 1) {
			currLink = links[i];
			refElement = document.querySelector(currLink.getAttribute('href'));

			var box = refElement.getBoundingClientRect();
			var topElem = box.top + scrollY - menuHeight;

			if (topElem <= scrollY && topElem + refElement.clientHeight > scrollY) {
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

	function animated(menu, speed, easing) {
		function control(e) {
			e.preventDefault();

			var box = document.querySelector(this.hash).getBoundingClientRect();
			var topElem = box.top + window.pageYOffset;
			scrollToY(topElem - menuHeight, speed, easing);
		}

		var i = void 0;
		var link = void 0;
		var links = menu.querySelectorAll('a[href^="#"]');

		for (i = 0; i < links.length; i += 1) {
			link = links[i];
			link.addEventListener('click', control);
		}
	};

	animated(menu, speed, easing);
	document.addEventListener('scroll', function () {
		menuControl(menu);
	});
};

// scrollMenu('.site__nav'); 
// scrollMenu('.site__nav', '.fix_menu'); 
// scrollMenu('.site__nav', '.fix_menu', 2000);
// scrollMenu('.site__nav', 0, 3000); // без фиксменю и со скоростью



// ===== swipe =====

function swipe(elem) {

	var touchstartX = 0;
	var touchstartY = 0;
	var touchendX = 0;
	var touchendY = 0;
	var treshold = 10;


	elem.addEventListener('touchstart', function (event) {
		touchstartX = event.changedTouches[0].screenX;
		touchstartY = event.changedTouches[0].screenY;
	}, false);

	elem.addEventListener('touchend', function (event) {
		touchendX = event.changedTouches[0].screenX;
		touchendY = event.changedTouches[0].screenY;
		handleGesture();
	}, false);

	function handleGesture() {
		var dx = touchendX - touchstartX;
		var dy = touchendY - touchstartY;
		var abs_dx = Math.abs(dx);
		var abs_dy = Math.abs(dy);


		if (abs_dx > treshold && abs_dx > abs_dy) {
			if (dx < 0) {
				elem.dispatchEvent(new CustomEvent("onSwipeLeft"));
			} else {
				elem.dispatchEvent(new CustomEvent("onSwipeRight"));
			}
		}

		if (abs_dy > treshold && abs_dy > abs_dx) {
			if (dy < 0) {
				elem.dispatchEvent(new CustomEvent("onSwipeUp"));
			} else {
				elem.dispatchEvent(new CustomEvent("onSwipeDown"));
			}
		}
	}
}
// var menu = document.querySelector('.nav');
// swipe(menu);
// menu.addEventListener("onSwipeUp", close);



//====== swiper we =========

// var mySwiper = new Swiper('.__swiper', {
// 	// spaceBetween: 20,
// 	loop: true,
// 	autoHeight: true,
// 	grabCursor: true,
// 	effect: 'fade',
// 	fadeEffect: {
// 		crossFade: true
// 	},
// 	navigation: {
// 		nextEl: '.__next_slide',
// 		prevEl: '.__prev_slide',
// 	},
// 	pagination: {
// 		el: '.__swiper-pagination',
// 		clickable: true,
// 	},
// 	breakpoints: {
// 		768: {
// 			// pagination: ' ',
// 		}
// 	}
// });
	