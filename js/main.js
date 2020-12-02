
objectFitImages(); 


//сбрасываем :focus при клике, но оставляем с клавиатуры

(function () {
	var button = document.querySelectorAll('a, button, label, input');

	var isMouseDown = false;

	for (var i = 0; i < button.length; i++) {
		var el = button[i];
		
		if (el.tagName !== 'LABEL') {
			el.classList.add('focus');
		}

		el.addEventListener('mousedown', function () {
			this.classList.remove('focus');
			isMouseDown = true;
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
					this.classList.add('focus');
		});
	}
}());


// ===== navigation =====

(function () {
	var nav = document.querySelector('.nav');
	var overlay = document.querySelector('.overlay');
	var body = document.querySelector('body');
	var burger = document.querySelector('.nav__burger');

	burger.addEventListener('click', toggleMenu);

	function toggleMenu() {
		this.classList.toggle('active');
		nav.classList.toggle('active');
		overlay.classList.toggle('active');
		body.classList.toggle('lock');
		swipe(nav);
	}

}());


// ===== menu drop ===== 

(function () {

	var btnDrop = document.querySelectorAll('[data-drop]');
	if (btnDrop) {
		for (var i = 0; i < btnDrop.length; i++) {

			var link = btnDrop[i].parentElement.querySelector('a');
			var label = '<span class="visuallyhidden">открыть подменю для“' + link.text + '”</span>';
			btnDrop[i].insertAdjacentHTML('beforeend', label);

			btnDrop[i].addEventListener('click', function (e) {
				if (this.classList.contains('active')) {
					this.classList.remove('active');
					this.nextElementSibling.classList.remove('show');
					this.setAttribute('aria-expanded', "false");
					this.parentElement.querySelector('a').setAttribute('aria-expanded', "false");
				} else {
					this.classList.add('active');
					this.nextElementSibling.classList.add('show');
					this.setAttribute('aria-expanded', "true");
					this.parentElement.querySelector('a').setAttribute('aria-expanded', "true");
				}
			});
		}
	}



}());


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


// ===== up =====

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


// ====== validate and send form ========

(function () {
	var form1 = document.getElementById('form_1');
	var form2 = document.getElementById('form_2');
	var form3 = document.getElementById('form_3');
	var reg = document.querySelectorAll('input[required]');

	if (reg) {
		for (var i = 0; i < reg.length; i++) {
			var elem = reg[i];
			elem.addEventListener('blur', check);
			elem.addEventListener('focus', rezet);
		}
	}

	if (form1) {
		form1.addEventListener('submit', validate);
	}
	if (form2) {
		form2.addEventListener('submit', ajaxSend);
		// form2.addEventListener('submit', validate);
	}
	if (form3) {
		// form3.addEventListener('submit', ajaxSend);
		form3.addEventListener('submit', validate);
	}

	function rezet() {
		var error = this.parentElement.querySelector('.error');
		this.classList.remove('invalid');
		error.innerHTML = '';
	}

	function check() {
		var error = this.parentElement.querySelector('.error');

		if (!this.validity.valid) {
			this.classList.add('invalid');
			error.innerHTML = 'ошибка / неправильный формат';
			if (this.validity.valueMissing || this.value === '') {
				error.innerHTML = 'ошибка / заполните поле';
			}
			return 1;
		} else {
			return 0;
		}
	}

	function validate(e) {
		var reg = this.querySelectorAll('input[required]');
		var agree = this.querySelector('input[name="agree"]');
		var countError = 0;
		if (!agree || agree.checked) {

			for (var i = 0; i < reg.length; i++) {
				var input = reg[i];
				countError += check.call(input);
				if (countError) {
					e.preventDefault();
				}
			}
		} else {
			e.preventDefault();
			countError++;
		}
		return countError;
	}

	function ajaxSend(e) {
		e.preventDefault();
		var el = this;
		var error = validate.call(el, e);

		if (error === 0) {
			this.classList.add('sending');
			var formData = new FormData(this);
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.getAttribute("action"));
			xhr.send(formData);

			xhr.onloadend = function () {
				if (xhr.status == 200) {
					el.classList.remove('sending');
					el.reset();
					// alert('Сообщение отправлено.');
					// alert(xhr.response);  //ответ сервера
				} else {
					console.log('Ошибка' + this.status);
				}
			}
		}
	}
}());









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
	

// ===== tabs =====

(function () {
	var tablist = document.querySelectorAll('[role="tablist"]')[0];
	var tabs = document.querySelectorAll('[role="tab"]');
	var panels = document.querySelectorAll('[role="tabpanel"]');

	function activateTab(tab, setFocus) {
		setFocus = setFocus || true;
		deactivateTabs();

		tab.removeAttribute('tabindex');
		tab.setAttribute('aria-selected', 'true');
		tab.classList.add('active');

		var controls = tab.getAttribute('aria-controls');

		document.getElementById(controls).removeAttribute('hidden');

		if (setFocus) {
			tab.focus();
		};
	};

	function deactivateTabs() {
		for (t = 0; t < tabs.length; t++) {
			tabs[t].setAttribute('tabindex', '-1');
			tabs[t].setAttribute('aria-selected', 'false');
			tabs[t].classList.remove('active');
			tabs[t].removeEventListener('focus', focusEventHandler);
		};

		for (p = 0; p < panels.length; p++) {
			panels[p].setAttribute('hidden', 'hidden');
		};
	};

	var keys = {
		end: 35,
		home: 36,
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};

	var direction = {
		37: -1,
		38: -1,
		39: 1,
		40: 1
	};

	for (i = 0; i < tabs.length; ++i) {
		addListeners(i);
	};

	function addListeners(index) {
		tabs[index].addEventListener('click', clickEventListener);
		tabs[index].addEventListener('keydown', keydownEventListener);
		tabs[index].addEventListener('keyup', keyupEventListener);

		tabs[index].index = index;
	};

	function clickEventListener(event) {
		var tab = event.target;
		activateTab(tab, false);
	};

	function keydownEventListener(event) {
		var key = event.keyCode;

		switch (key) {
			case keys.end:
				event.preventDefault();
				activateTab(tabs[tabs.length - 1]);
				break;
			case keys.home:
				event.preventDefault();
				activateTab(tabs[0]);
				break;

			case keys.up:
			case keys.down:
				determineOrientation(event);
				break;
		};
	};

	function keyupEventListener(event) {
		var key = event.keyCode;

		switch (key) {
			case keys.left:
			case keys.right:
				determineOrientation(event);
				break;
		};
	};

	function determineOrientation(event) {
		var key = event.keyCode;
		var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
		var proceed = false;

		if (vertical) {
			if (key === keys.up || key === keys.down) {
				event.preventDefault();
				proceed = true;
			};
		} else {
			if (key === keys.left || key === keys.right) {
				proceed = true;
			};
		};

		if (proceed) {
			switchTabOnArrowPress(event);
		};
	};

	function switchTabOnArrowPress(event) {
		var pressed = event.keyCode;

		for (x = 0; x < tabs.length; x++) {
			tabs[x].addEventListener('focus', focusEventHandler);
		};

		if (direction[pressed]) {
			var target = event.target;
			if (target.index !== undefined) {
				if (tabs[target.index + direction[pressed]]) {
					tabs[target.index + direction[pressed]].focus();
				} else if (pressed === keys.left || pressed === keys.up) {
					focusLastTab();
				} else if (pressed === keys.right || pressed == keys.down) {
					focusFirstTab();
				};
			};
		};
	};

	function focusFirstTab() {
		tabs[0].focus();
	};

	function focusLastTab() {
		tabs[tabs.length - 1].focus();
	};

	function focusEventHandler(event) {
		var target = event.target;

		setTimeout(checkTabFocus, 30, target);
	};

	function checkTabFocus(target) {
		focused = document.activeElement;

		if (target === focused) {
			activateTab(target, false);
		};
	};
}());



function initMap() {
	var myPos = new google.maps.LatLng(55.730613, 37.593276);
	var elem = document.getElementById('map');

	if (elem) {
		var map = new google.maps.Map(elem, {
			center: myPos, 
			zoom: 15, // 0 - 21
			disableDefaultUI: true, 
		});
	}

	
	var marker = new google.maps.Marker({
		position: myPos, 
		map: map, 
		icon: "img/pin.png" ,           
	});


}
// google.maps.event.addDomListener(window, "load", initMap);




// ===== выбрано файлов =====

(function () {

	// выбрано файлов имя или кол-во

	var fileName = document.getElementById('file-name');
	var inputFile = document.getElementById('input_file');
	inputFile.addEventListener('change', countFile);

	function countFile() {
		files = this.files;

		if (files.length == 1) {
			fileName.innerHTML = 'Имя файла: ' + files[0].name;
		} else {
			fileName.innerHTML = 'Выбрано ' + files.length + ' Файла(ов)';
		}
	}
}());



