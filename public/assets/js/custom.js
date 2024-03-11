(function ($) {
	"use strict";
	var $document = $(document),
		$window = $(window),
		plugins = {
			mainSlider: $('#mainSlider'),
			slideNav: $('#slide-nav'),
			categoryCarousel: $('.category-carousel'),
			testimonialsCarousel: $('.testimonials-carousel'),
			testimonialsSingleCarousel: $('.testimonials-single-carousel'),
			testimonialsSingleCarousel2: $('.testimonials-single-carousel-layout2'),
			testimonialsGrid: $('.testimonials-grid'),
			servicesCarousel: $('.text-icon-carousel'),
			servicesCarousel2: $('.text-icon-grid'),
			personCarousel: $('.person-carousel'),
			brandCarousel: $('.brand-carousel'),
			postTipsCarousel: $('.post-tips-carousel'),
			submenu: $('[data-submenu]'),
			contactForm: $('#contactform'),
			quoteForm1: $('#quoteform1'),
			quoteForm2: $('#quoteform2'),
			questionForm: $('.question-form'),
			bookingForm: $('.booking-form'),
			appointmentForm: $('.appointment-form'),
			sellDeviceForm: $('.selldevice-form'),
			googleMapFooter: 'footer-map',
			iconSquared: $('.text-icon-squared'),
			counterBlock: $('#counterBlock'),
			testimonialsMoreLink: $('.view-more-testimonials'),
			postGallery: $('.blog-isotope'),
			postCarousel: $('.post-carousel'),
			postMoreLink: $('.view-more-post'),
			networkEffect: $('.network-effect'),
			animation: $('.animation'),
			productImage: $("#mainImage"),
			rangeSlider: $('#rangeSlider1'),
			prdCarousel: $('.prd-carousel'),
			stickyHeader: $(".page-header.sticky"),
			stackTable: $('.stack-table'),
			servicesTab: $('.services-tab-content, .prices-tab-content')
		},
		$shiftMenu = $('#slidemenu'),
		$navbarToggle = $('.navbar-toggle'),
		$dropdown = $('.dropdown-submenu, .dropdown'),
		$fullHeight = $('#mainSlider, #mainSlider .img--holder');

	// Google map options
	var googleMapOption = {
		latitude: 59.3,
		longitude: 18.0941403,
		zoom: 14,
		marker: [
				['Best Hotel', 59.3, 18.0941403, 1, 'images/map-marker-active.png']
			],
		markers: [
				['Object number eight', 59.298000, 18.090000, 8, 'images/map-marker-active.png'],
				['Object number seven', 59.292580, 18.080000, 7, 'images/map-marker.png'],
				['Object number six', 59.295000, 18.070000, 6, 'images/map-marker.png'],
				['Object number five', 59.29100, 18.050000, 5, 'images/map-marker.png'],
				['Object number four', 59.302627, 18.1073223, 4, 'images/map-marker.png'],
				['Object number three', 59.305004, 18.0733833, 3, 'images/map-marker.png'],
				['Object number two', 59.29383, 18.0814213, 2, 'images/map-marker.png'],
				['Object number one', 59.291129, 18.0931024, 1, 'images/map-marker.png']
			]
	}
	/* ---------------------------------------------
     Scripts initialization
    --------------------------------------------- */
	$document.ready(function () {
		var windowWidth = window.innerWidth || $window.width();
		var windowH = $window.height();

		if (plugins.stackTable.length) {
			$(plugins.stackTable).stacktable();
		}
		// set fullheigth
		if (windowWidth < 992) {
			$fullHeight.height('');
		} else {
			$fullHeight.height(windowH - $('.page-header').height());
		}
		// detect touch
		if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
			$('body').addClass('touch');
		}
		// detect IOS
		if (navigator.userAgent.match(/iPhone|iPod/i)) {
			$('body').addClass('is-ios');
		}
		// main slider
		if (plugins.mainSlider.length) {
			var $el = plugins.mainSlider;
			$el.on('init', function (e, slick) {
				var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
				doAnimations($firstAnimatingElements);
			});
			$el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
				var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]')
				var $animatingElements = $currentSlide.find('[data-animation]');
				doAnimations($animatingElements);
			});
			$el.slick({
				arrows: false,
				dots: false,
				autoplay: true,
				autoplaySpeed: 7000,
				fade: true,
				speed: 1000,
				pauseOnHover: false,
				pauseOnDotsHover: true
			});
		}

		// apply network effect
		if (plugins.networkEffect.length && !$('body').hasClass('touch')) {
			networkEffect();
		}
		// number counter
		if (plugins.counterBlock.length) {
			plugins.counterBlock.waypoint(function () {
				$('.number > span', plugins.counterBlock).each(count);
				this.destroy();
			}, {
				triggerOnce: true,
				offset: '80%'
			});
		}
		// services Tabs
		if (plugins.servicesTab.length) {
			servicesTabs();
			servicesTabsTooltip();
			servicesShowAll();
		}
		// CAROUSELS
		// products carousel
		if (plugins.prdCarousel.length) {
			plugins.prdCarousel.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: false,
				dots: false,
				arrows: true,
				autoplay: false,
				autoplaySpeed: 3000,
				responsive: [{
					breakpoint: 1299,
					settings: {
						dots: true,
						arrows: false
					}
				}, {
					breakpoint: 991,
					settings: {
						slidesToShow: 3,
						dots: true,
						arrows: false
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						dots: true,
						arrows: false
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						dots: true,
						arrows: false
					}
				}]
			});
		}
		// testimonials carousel
		if (plugins.testimonialsCarousel.length) {
			plugins.testimonialsCarousel.slick({
				mobileFirst: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 2000,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 991,
					settings: {
						slidesToShow: 2
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 1
					}
				}]
			});
		}
		// testimonials single carousel
		if (plugins.testimonialsSingleCarousel.length) {
			plugins.testimonialsSingleCarousel.slick({
				mobileFirst: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 4000,
				arrows: true,
				dots: true
			});
		}
		if (plugins.testimonialsSingleCarousel2.length) {
			plugins.testimonialsSingleCarousel2.slick({
				mobileFirst: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 4000,
				arrows: false,
				dots: true
			});
		}
		// person carousel
		if (plugins.personCarousel.length) {
			plugins.personCarousel.slick({
				mobileFirst: false,
				slidesToShow: 4,
				slidesToScroll: 2,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 5000,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 1199,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
					}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			});
		}
		// brand carousel
		if (plugins.brandCarousel.length) {
			plugins.brandCarousel.slick({
				mobileFirst: false,
				slidesToShow: 8,
				slidesToScroll: 1,
				infinite: false,
				autoplay: true,
				autoplaySpeed: 5000,
				arrows: false,
				dots: true,
				variableWidth: true,
				responsive: [{
					breakpoint: 1199,
					settings: {
						slidesToShow: 6
					}
			}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 5
					}
			}]
			});
		}
		// brand carousel
		if (plugins.postTipsCarousel.length) {
			plugins.postTipsCarousel.slick({
				mobileFirst: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: false,
				autoplay: true,
				autoplaySpeed: 5000,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 991,
					settings: {
						slidesToShow: 2
					}
			}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 1
					}
			}]
			});
		}
		// category carousel
		if (plugins.categoryCarousel.length) {
			plugins.categoryCarousel.slick({
				mobileFirst: false,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				arrows: false,
				dots: true,
				autoplay: true,
				autoplaySpeed: 6000,
				responsive: [{
					breakpoint: 991,
					settings: {
						slidesToShow: 4
					}
			}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
			}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
			}]
			});
		}
		// post carousel
		if (plugins.postCarousel.length) {
			plugins.postCarousel.slick({
				mobileFirst: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 3000,
				arrows: true,
				dots: false,
				fade: true
			});
		}
		// END CAROUSELS
		// slide menu
		if (plugins.slideNav.length) {
			var $slideNav = plugins.slideNav,
				toggler = '.js-navbar-toggle',
				$slidemenu = $('#slidemenu'),
				menuwidth = '100%',
				slidewidth = '270px',
				menuneg = '-100%',
				slideneg = '-270px';
			$slideNav.after($('<div id="navbar-height-col"></div>'));
			$slideNav.on("click", toggler, function (e) {
				var $this = $(this);
				var $heightCol = $('#navbar-height-col');
				var selected = $this.hasClass('slide-active');
				e.preventDefault();
				$slidemenu.stop().animate({
					left: selected ? menuneg : '0px'
				});
				$heightCol.stop().animate({
					left: selected ? slideneg : '0px'
				});
				$(toggler).toggleClass('slide-active', !selected);
				$('body').toggleClass('slide-active');
				$slidemenu.toggleClass('slide-active');
				$shiftMenu.toggleClass('slide-active');
			});
		}
		// post isotope
		if (plugins.postGallery.length) {
			var $postgallery = plugins.postGallery;
			$postgallery.imagesLoaded(function () {
				setPostSize();
			});
			$postgallery.isotope({
				itemSelector: '.blog-post',
				masonry: {
					gutter: 30,
					columnWidth: '.blog-post:not(.doubleW)'
				}
			});
		}
		// post more ajax load
		if (plugins.postMoreLink.length) {
			var $postMoreLink = plugins.postMoreLink,
				$postPreload = $('#postPreload'),
				$postLoader = $('#moreLoader');
			$postMoreLink.on('click', function () {
				var target = $(this).attr('data-load');
				$postLoader.addClass('visible');
				$(this).hide();
				$.ajax({
					url: target,
					success: function (data) {
						setTimeout(function () {
							$postPreload.append(data);
							$postLoader.removeClass('visible');
						}, 500);
					}
				});
			})
		}
		// testimonials more ajax load
		if (plugins.testimonialsMoreLink.length) {
			var $testimonialsMoreLink = plugins.testimonialsMoreLink,
				$testimonialsPreload = $('.testimonials-grid > .row'),
				$testimonialsLoader = $('#moreLoader');
			$testimonialsMoreLink.on('click', function () {
				var target = $(this).attr('data-load');
				$testimonialsLoader.addClass('visible');
				$(this).hide();
				$.ajax({
					url: target,
					success: function (data) {
						setTimeout(function () {
							$testimonialsPreload.append(data);
							$testimonialsLoader.removeClass('visible');
						}, 500);
					}
				});
			})
		}
		// contact page form
		if (plugins.contactForm.length) {
			var $contactform = plugins.contactForm;
			$contactform.validate({
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					message: {
						required: true,
						minlength: 20
					},
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					name: {
						required: "Please enter your name",
						minlength: "Your name must consist of at least 2 characters"
					},
					message: {
						required: "Please enter message",
						minlength: "Your message must consist of at least 20 characters"
					},
					email: {
						required: "Please enter your email"
					}
				},
				submitHandler: function (form) {
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "process-contact.php",
						success: function () {
							$('#success').fadeIn();
							$('#contactform').each(function () {
								this.reset();
							});
						},
						error: function () {
							$('#contactform').fadeTo("slow", 0, function () {
								$('#error').fadeIn();
							});
						}
					});
				}
			});
		}

		// quote form 1
		if (plugins.quoteForm1.length) {
			var $quoteForm = plugins.quoteForm1;
			$quoteForm.validate({
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					message: {
						required: true,
						minlength: 20
					},
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					name: {
						required: "Please enter your name",
						minlength: "Your name must consist of at least 2 characters"
					},
					message: {
						required: "Please enter message",
						minlength: "Your message must consist of at least 20 characters"
					},
					email: {
						required: "Please enter your email"
					}
				},
				submitHandler: function (form) {
					var $this = $(form);
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "process-quote1.php",
						success: function () {
							console.log($this)
							$('.successform', $this).fadeIn();
							$('.quote-form-js').each(function () {
								this.reset();
							});
						},
						error: function () {
							$('.quote-form-js').fadeTo("slow", 0, function () {
								$('.errorform', $this).fadeIn();
							});
						},
					});
				}
			});
		}

		// quote form 2
		if (plugins.quoteForm2.length) {
			var $quoteForm = plugins.quoteForm2;
			$quoteForm.validate({
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					message: {
						required: true,
						minlength: 20
					},
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					name: {
						required: "Please enter your name",
						minlength: "Your name must consist of at least 2 characters"
					},
					message: {
						required: "Please enter message",
						minlength: "Your message must consist of at least 20 characters"
					},
					email: {
						required: "Please enter your email"
					}
				},
				submitHandler: function (form) {
					var $this = $(form);
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "process-quote2.php",
						success: function () {
							console.log($this)
							$('.successform', $this).fadeIn();
							$('.quote-form-js').each(function () {
								this.reset();
							});
						},
						error: function () {
							$('.quote-form-js').fadeTo("slow", 0, function () {
								$('.errorform', $this).fadeIn();
							});
						},
					});
				}
			});
		}

		// booking form
		if (plugins.bookingForm.length) {
			var bookingForm = plugins.bookingForm;
			bookingForm.validate({
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					message: {
						required: true,
						minlength: 20
					},
					email: {
						required: true,
						email: true
					}

				},
				messages: {
					name: {
						required: "Please enter your name",
						minlength: "Your name must consist of at least 2 characters"
					},
					message: {
						required: "Please enter message",
						minlength: "Your message must consist of at least 20 characters"
					},
					email: {
						required: "Please enter your email"
					}
				},
				submitHandler: function (form) {
					var $this = $(form);
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "process-booking.php",
						success: function () {
							console.log($this)
							$('.successform', $this).fadeIn();
							$('.booking-form').each(function () {
								this.reset();
							});
						},
						error: function () {
							$('.booking-form').fadeTo("slow", 0, function () {
								$('.errorform', $this).fadeIn();
							});
						},
					});
				}
			});
		}

		// question form
		if (plugins.questionForm.length) {
			var questionForm = plugins.questionForm;
			questionForm.validate({
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					message: {
						required: true,
						minlength: 20
					},
					email: {
						required: true,
						email: true
					}

				},
				messages: {
					name: {
						required: "Please enter your name",
						minlength: "Your name must consist of at least 2 characters"
					},
					message: {
						required: "Please enter message",
						minlength: "Your message must consist of at least 20 characters"
					},
					email: {
						required: "Please enter your email"
					}
				},
				submitHandler: function (form) {
					var $this = $(form);
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "process-question.php",
						success: function () {
							console.log($this)
							$('.successform', $this).fadeIn();
							$('.question-form').each(function () {
								this.reset();
							});
						},
						error: function () {
							$('.question-form').fadeTo("slow", 0, function () {
								$('.errorform', $this).fadeIn();
							});
						},
					});
				}
			});
		}

		// make appointment  form
		if (plugins.appointmentForm.length) {
			var appointmentForm = plugins.appointmentForm;
			appointmentForm.each(function () {
				var $this = $(this);
				$this.validate({
					rules: {
						name: {
							required: true,
							minlength: 2
						},
						message: {
							required: true,
							minlength: 20
						},
						email: {
							required: true,
							email: true
						}

					},
					messages: {
						name: {
							required: "Please enter your name",
							minlength: "Your name must consist of at least 2 characters"
						},
						message: {
							required: "Please enter message",
							minlength: "Your message must consist of at least 20 characters"
						},
						email: {
							required: "Please enter your email"
						}
					},
					submitHandler: function (form) {
						var $this = $(form);
						$(form).ajaxSubmit({
							type: "POST",
							data: $(form).serialize(),
							url: "process-appointment.php",
							success: function () {
								console.log($this)
								$('.successform', $this).fadeIn();
								$this.get(0).reset();
								setTimeout(function () {
									$('.successform', $this).fadeOut()
								}, 5000);
							},
							error: function () {
								$('.errorform', $this).fadeIn();
								setTimeout(function () {
									$('.errorform', $this).fadeOut()
								}, 5000);
							},
						});
					}
				});
			})
		}

		// sell device form
		if (plugins.sellDeviceForm.length) {
			var sellDeviceForm = plugins.sellDeviceForm;
			sellDeviceForm.each(function () {
				var $this = $(this);
				$this.validate({
					rules: {
						name: {
							required: true,
							minlength: 2
						},
						message: {
							required: true,
							minlength: 20
						},
						email: {
							required: true,
							email: true
						}

					},
					messages: {
						name: {
							required: "Please enter your name",
							minlength: "Your name must consist of at least 2 characters"
						},
						message: {
							required: "Please enter message",
							minlength: "Your message must consist of at least 20 characters"
						},
						email: {
							required: "Please enter your email"
						}
					},
					submitHandler: function (form) {
						var $this = $(form);
						$(form).ajaxSubmit({
							type: "POST",
							data: $(form).serialize(),
							url: "process-selldevice.php",
							success: function () {
								console.log($this)
								$('.successform', $this).fadeIn();
								$this.get(0).reset();
								setTimeout(function () {
									$('.successform', $this).fadeOut()
								}, 5000);
							},
							error: function () {
								$('.errorform', $this).fadeIn();
								setTimeout(function () {
									$('.errorform', $this).fadeOut()
								}, 5000);
							},
						});
					}
				});
			})
		}

		// datepicker
		if ($('.datetimepicker').length) {
			$('.datetimepicker').datetimepicker({
				format: 'DD/MM/YYYY',
				icons: {
					time: 'icon icon-clock',
					date: 'icon icon-calendar',
					up: 'icon icon-arrow_up',
					down: 'icon icon-arrow_down',
					previous: 'icon icon-arrow-left',
					next: 'icon icon-arrow-right',
					today: 'icon icon-today',
					clear: 'icon icon-trash',
					close: 'icon icon-cancel-music'
				}
			});
		}
		if ($('.timepicker').length) {
			$('.timepicker').datetimepicker({
				format: 'LT',
				icons: {
					time: 'icon icon-clock',
					up: 'icon icon-arrow_up',
					down: 'icon icon-arrow_down',
					previous: 'icon icon-arrow-left',
					next: 'icon icon-arrow-right'
				}
			});
		}

		// services Tabs
		function servicesTabsTooltip() {
			$('.js-services-tab-toggle').on('click', function (e) {
				$(this).parent().toggleClass('closed');
				e.preventDefault();
			})
			$('.service-tip').each(function () {
				var $this = $(this);
				$this.css({
					'top': $this.data('top'),
					'left': $this.data('left')
				});
			})
			$('.service-tip').on('click', function () {
				if ((window.innerWidth || $window.width()) < 769) {
					var tip = $(this).find('.service-tip-html').html(),
						$tipContainer = $(this).closest('.services-tab-content-text').find('.js-service-tooltip-mob .text');
					$tipContainer.parent().addClass('opened');
					$tipContainer.html(tip);
				}
			})
			$('.js-service-tooltip-close').on('click', function () {
				$('.service-tooltip-mob').removeClass('opened');
			})
			$('[data-sync]').on('click', function () {
				return false;
			})
			$('.service-tip').on('mouseenter', function () {
				var $this = $(this);
				$this.closest('.tab-pane').find('.services-tab-list li').removeClass('hovered');
				$this.closest('.tab-pane').find('.service-tip').removeClass('hovered');
				$this.closest('.tab-pane').find('.' + $(this).data('sync')).addClass('hovered');
			}).on('mouseleave', function () {
				var $this = $(this);
				$this.parent().removeClass('hovered');
				$this.closest('.tab-pane').find('.' + $(this).data('sync')).removeClass('hovered');
			})
			$('[data-sync]').on('mouseenter', function () {
				var $this = $(this);
				$this.parent().siblings().removeClass('hovered');
				$this.closest('.tab-pane').find('.service-tip').removeClass('hovered');
				$this.closest('.tab-pane').find('.' + $(this).data('sync')).addClass('hovered');
			}).on('mouseleave', function () {
				var $this = $(this);
				$this.parent().removeClass('hovered');
				$this.closest('.tab-pane').find('.' + $(this).data('sync')).removeClass('hovered');
			})
			$(window).on('resize', function () {
				$('.service-tooltip-mob').removeClass('opened');
			});
		}

		function servicesTabs() {
      
			$('.tab-dropdown [data-toggle]').on('click', function (e) {
				var $this = $(this);
				$this.closest('.tab-dropdown').find('li').removeClass('active');
				$this.closest('.tab-dropdown').parent('li').addClass('active');
				$this.closest('.tab-dropdown').parent('li').siblings().removeClass('active');
			})
			$('.js-col-toggle').on('click', function (e) {
				var $this = $(this);
				if ($this.data('target')) {
					$this.parent().siblings().removeClass('active');
					$this.parent().addClass('active');
					$this.closest('.tab-pane').find('.col-price > *').addClass('hidden');
					$this.closest('.tab-pane').find('.' + $this.data('target')).removeClass('hidden');
				}
				e.preventDefault();
			})
			$('.nav-pills > li').on('click', function (e) {
				var $this = $(this);
				if($('body').hasClass('touch')){
					$this.addClass('active hovered');
					$this.siblings().removeClass('active hovered');
          var $tab = $($this.find('[data-toggle]').attr('href'));
          $tab.addClass('active in');
          $tab.siblings().removeClass('active in');
				} else {
					$this.removeClass('active hovered');
				}
			})
			$(document).on('touchstart', function (event) {
				if (!$(event.target).closest('.nav-pills').length) {
					$('.nav-pills > li').removeClass('active hovered');
				}
			})
		}

		function servicesShowAll() {
			$('[data-show]').each(function () {
				var $this = $(this),
					show = $this.data('show') - 1;
				$this.find('li:gt(' + show + ')').hide();
				$this.find('li:last-child').show();
			})
			$('.all-link').on('click', function (e) {
				var $this = $(this);
				$this.closest('ul').find('li').show();
				$this.hide();
				e.preventDefault();
			})
		}

		// product gallery
		function handleResize(mq) {
			if (mq.matches) {
				ezApi.changeState('enable');
			} else {
				ezApi.changeState('disable');
			}
		}
		if (plugins.productImage.length) {
			plugins.productImage.elevateZoom({
				gallery: 'productPreviews',
				cursor: 'pointer',
				galleryActiveClass: 'active',
				zoomWindowPosition: 1,
				zoomWindowFadeIn: 500,
				zoomWindowFadeOut: 500,
				lensFadeIn: 500,
				lensFadeOut: 500
			});
			var ezApi = plugins.productImage.data('elevateZoom');
			if ((window.innerWidth || $window.width()) < 769) {
				ezApi.changeState('disable');
			}
			var mq = window.matchMedia('screen and (min-width: 768px)');
			mq.addListener(handleResize);
			$('#productPreviews > a').on('click', function () {
				plugins.productImage.attr({
					src: $(this).attr('data-image'),
					'data-zoom-image': $(this).attr('data-zoom-image')
				})
			})
		}

		// icrease/decrease input
		function changeInput() {
			$(document).on('click', '.count-add, .count-reduce', function (e) {
				var $this = $(e.target),
					input = $this.parent().find('.count-input'),
					v = $this.hasClass('count-reduce') ? (input.val() - 1) : (input.val() * 1 + 1),
					min = input.attr('data-min') ? input.attr('data-min') : 1;
				if (v >= min) input.val(v);
				e.preventDefault();
			});
		}
		changeInput();

		// rangeSlider
		if (plugins.rangeSlider.length) {
			var rangeSlider1 = document.getElementById('rangeSlider1');
			noUiSlider.create(rangeSlider1, {
				start: [100, 2000],
				connect: true,
				step: 100,
				padding: 100,
				range: {
					'min': 0,
					'max': 10100,
				}
			});
			var number1_1 = document.getElementById('number-1-1');
			var number1_2 = document.getElementById('number-1-2');
			rangeSlider1.noUiSlider.on('update', function (values, handle) {
				var value = values[handle];
				if (handle) {
					number1_1.textContent = Math.round(value);
				} else {
					number1_2.textContent = Math.round(value);
				}
			});
			number1_1.addEventListener('change', function () {
				rangeSlider1.noUiSlider.set([this.textContent, null]);
			});
			number1_2.addEventListener('change', function () {
				rangeSlider1.noUiSlider.set([null, this.textContent]);
			});
		}

		if (windowWidth < 769) {
			startCarousel();
		} else {
			if (plugins.iconSquared.length) {
				equalHeight(".text-icon-squared", ".title", ".text");
			}
			if (plugins.testimonialsGrid.length) {
				equalHeight(".testimonials-grid .testimonials-item", ".title", ".text");
			}
		}
		// sticky header
		$.fn.stickyHeader = function () {
			var $header = this,
				$body = $('body'),
				headerOffset,
				stickyH;

			function setHeigth() {
				$(".stspace").remove();
				$header.removeClass('animated is-sticky fadeIn');
				$body.removeClass('hdr-sticky');
				headerOffset = $('#slidemenu', $header).offset().top;
				stickyH = $header.height() + headerOffset;
			}
			setHeigth();
			var prevWindow = window.innerWidth || $(window).width()
			$(window).on('resize', function () {
				var currentWindow = window.innerWidth || $(window).width();
				if (currentWindow != prevWindow) {
					setHeigth()
					prevWindow = currentWindow;
				}
			});
			$(window).scroll(function () {
				//if (prevWindow < 992) return;
				var st = getCurrentScroll();
				if (st > headerOffset) {
					if (!$(".stspace").length && !$body.hasClass('home')) {
						$header.after('<div class="stspace"></div>');
						$(".fix-space").css({
							'height': $header.height() + 'px'
						});
					}
					$header.addClass('is-sticky animated fadeIn');
				} else {
					$(".stspace").remove();
					$header.removeClass('animated is-sticky fadeIn');
				}
			});

			function getCurrentScroll() {
				return window.pageYOffset || document.documentElement.scrollTop;
			}
		}

		if (plugins.stickyHeader.length) {
			$(plugins.stickyHeader).stickyHeader();
		}

		toggleNavbarMethod(windowWidth);
		slideMobileInfo('.js-info-toggle', '.header-info-mobile');
		headerSearch('#search-button', '#hide-search-input-container', '#search-input-container');
		toggleCart('.header-cart', '.header-cart-dropdown');
		modalPopup('.modal-popup-link');
		popupForm('.form-popup-link');
		backToTop('.back-to-top');
		scrollSlider('.js-scroll-bottom');

		// Resize window events
		$window.resize(function () {
			var windowWidth = window.innerWidth || $window.width();
			if (windowWidth < 992) {
				startCarousel();
				$fullHeight.height('');
			}
			if (windowWidth > 991 && $navbarToggle.is(':hidden')) {
				$shiftMenu.removeClass('slide-active');
			}
			if (plugins.iconSquared.length) {
				$(".text-icon-squared, .text-icon-squared .title, .text-icon-squared .text").each(function () {
					$(this).css({
						'height': ''
					});
				})
			}
			if (plugins.testimonialsGrid.length) {
				$(".testimonials-grid .testimonials-item, .testimonials-grid .testimonials-item .title, .testimonials-grid .testimonials-item .text").each(function () {
					$(this).css({
						'height': ''
					});
				})
			}
		});
		$(window).resize(debouncer(function (e) {
			var windowWidth = window.innerWidth || $window.width();
			if (windowWidth > 991) {
				$fullHeight.height($window.height() - $('.page-header').height());
				if (plugins.iconSquared.length) {
					equalHeight(".text-icon-squared", ".title", ".text");
				}
				if (plugins.testimonialsGrid.length) {
					equalHeight(".testimonials-grid .testimonials-item", ".title", ".text");
				}
			} else {
				$fullHeight.height('');
			}
			if (plugins.postGallery.length) {
				setPostSize();
			}
			$dropdown.removeClass('opened');
			toggleNavbarMethod(windowWidth);
		}))

		$('#loader-wrapper').fadeOut(500);

	})


	$window.on('load', function () {
		var windowWidth = window.innerWidth || $window.width();
		// lazy loading effect
		if (plugins.animation.length) {
			onScrollInit(plugins.animation, windowWidth);
		}
		if ($('#' + plugins.googleMapFooter).length) {
			createMapFooter(plugins.googleMapFooter, googleMapOption.zoom, googleMapOption.latitude, googleMapOption.longitude, googleMapOption.markers);
		}
	});
	/* ---------------------------------------------
	     Functions
	    --------------------------------------------- */
	// Set equal height to block
	function equalHeight(block) {
		var wrapWidth = $(block).parent().width(),
			blockWidth = $(block).width(),
			wrapDivide = Math.floor(wrapWidth / blockWidth),
			cellArr = $(block);
		for (var arg = 1; arg <= arguments.length; arg++) {
			for (var i = 0; i <= cellArr.length; i = i + wrapDivide) {
				var maxHeight = 0,
					heightArr = [];
				for (var j = 0; j < wrapDivide; j++) {
					heightArr.push($(cellArr[i + j]).find(arguments[arg]));
					if (heightArr[j].outerHeight() > maxHeight) {
						maxHeight = heightArr[j].outerHeight();
					}
				}
				for (var counter = 0; counter < heightArr.length; counter++) {
					$(cellArr[i + counter]).find(arguments[arg]).outerHeight(maxHeight);
				}
			}
		}
	}
	// Slide mobile info
	function slideMobileInfo(toggle, slide) {
		var $toggle = $(toggle),
			$slide = $(slide);
		$toggle.on("click", function (e) {
			$(this).parent().toggleClass('open');
			$slide.slideToggle(300).toggleClass('open');
			e.preventDefault();
		})
	}
	// Scroll Slider
	function scrollSlider(button) {
		var $button = $(button);
		$button.on('click', function (e) {
			$('body,html').animate({
				scrollTop: $('#mainSlider').offset().top + $('#mainSlider').height() - 300
			}, 1000);
			e.preventDefault();
		});
	}
	// Back to top
	function backToTop(button) {
		var $button = $(button);
		$(window).on('scroll', function () {
			if ($(this).scrollTop() >= 500) {
				$button.addClass('visible');
			} else {
				$button.removeClass('visible');
			}
		});
		$button.on('click', function (e) {
			$('body,html').animate({
				scrollTop: 0
			}, 1000);
			e.preventDefault();
		});
	}
	// Slider Animation
	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
	// Time Out Resize
	function debouncer(func, timeout) {
		var timeoutID, timeout = timeout || 500;
		return function () {
			var scope = this,
				args = arguments;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function () {
				func.apply(scope, Array.prototype.slice.call(args));
			}, timeout);
		}
	}
	// Count To
	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
	// Set Post Size fo masonry
	function setPostSize() {
		var windowW = window.innerWidth || $window.width(),
			itemsInRow = 1;
		if (windowW > 1199) {
			itemsInRow = 3;
		} else if (windowW > 767) {
			itemsInRow = 3;
		} else if (windowW > 480) {
			itemsInRow = 1;
		}
		var $postgallery = plugins.postGallery;
		var containerW = $postgallery.parent('.container').width() - 60,
			galleryW = containerW / itemsInRow;
		$postgallery.find('.blog-post').each(function () {
			if (windowW > 767) {
				if ($(this).hasClass('doubleW')) {
					$(this).css({
						width: galleryW * 2 + 30 + 'px',
					});
				} else {
					$(this).css({
						width: galleryW + 'px'
					});
				}
			} else {
				$(this).css({
					width: galleryW + 60 + 'px'
				});
			}
		});
		setTimeout(function () {
			$('.slick-initialized').slick('setPosition');
			$postgallery.isotope('layout');
		}, 100);
	}
	// Mobile Only carousel initialization
	function slickMobileServices2(carousel) {
		carousel.slick({
			mobileFirst: true,
			rows: 3,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 3000,
			arrows: false,
			dots: true,
			adaptiveHeight: true,
			pauseOnHover: false,
			pauseOnFocus: false,
			swipe: false,
			responsive: [{
				breakpoint: 767,
				settings: "unslick",
			}]
		});
	}

	function slickMobileServices(carousel) {
		carousel.slick({
			mobileFirst: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 3000,
			arrows: false,
			dots: true,
			adaptiveHeight: true,
			responsive: [{
				breakpoint: 767,
				settings: "unslick",
			}]
		});
	}
	// Mobile Only carousel
	function startCarousel() {
		if (plugins.servicesCarousel.length) {
			slickMobileServices(plugins.servicesCarousel);
		}
		if (plugins.servicesCarousel2.length) {
			slickMobileServices2(plugins.servicesCarousel2);
		}
	}
	// modal popup
	function modalPopup(drop) {
		if ($(drop).length) {
			$(drop).magnificPopup({
				type: 'inline',
				midClick: true,
				removalDelay: 300,
				mainClass: 'mfp-fade',
				closeMarkup: '<button title="%title%" class="mfp-close" style="position: absolute; top: 30px; right: -15px">close</button>'
			});
		}
	}
	// dropdown form
	function popupForm(link) {
		if ($(link).length) {
			$(link).on('click', function (e) {
				var $popup = $(this).next();
				var diff = $(window).width() - $popup.offset().left - $popup.width();
				if (diff < 0) {
					$popup.css({
						'margin-left': -$popup.width() * .5 + diff - 10
					})
				}
				if ($popup.offset().left < 0) {
					$popup.css({
						'margin-left': -$popup.width() * .5 - $popup.offset().left + 10
					})
				}
				$popup.toggleClass('opened');
				$(this).toggleClass('active');
				e.preventDefault();
			})
			$('.form-popup-close').on('click', function (e) {
				var $popup = $(this).closest('.form-popup');
				$popup.toggleClass('opened');
				$popup.prev().removeClass('active');
				$(this).toggleClass('active');
				$popup.css({
					'margin-left': ''
				})
				e.preventDefault();
			})
			$(document).on('click', function (event) {
				if (!$(event.target).closest('.form-popup-wrap').length) {
					if ($('.form-popup').hasClass("opened")) {
						$('.form-popup').prev().removeClass('active');
						$('.form-popup').removeClass('opened');
						$('.form-popup').css({
							'margin-left': ''
						})
					}
				}
			})
		}
	}
	// Navigation dropdown menu
	function toggleNavbarMethod(windowWidth) {
		var $dropdownLink = $(".dropdown > a, .dropdown-submenu > a");
		var $dropdown = $(".dropdown, .dropdown-submenu");
		var $dropdownCaret = $(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret");
		$dropdownLink.on('click.toggleNavbarMethod', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var url = $(this).attr('href');
			if (url) $(location).attr('href', url);
		});
		if (windowWidth < 992) {
			$dropdown.unbind('.toggleNavbarMethod');
			$dropdownCaret.unbind('.toggleNavbarMethod');
			$dropdownCaret.on('click.toggleNavbarMethod', function (e) {
				e.stopPropagation();
				e.preventDefault();
				var $li = $(this).parent().parent('li');
				if ($li.hasClass('opened')) {
					$li.find('.dropdown-menu').first().stop(true, true).slideUp(0);
					$li.removeClass('opened');
				} else {
					$li.find('.dropdown-menu').first().stop(true, true).slideDown(0);
					$li.addClass('opened');
				}
			})
		}
	}

	// Header Search
	function headerSearch(open, close, container) {
		var $container = $(container);
		$(open).on('click', function (e) {
			if ($container.hasClass('hdn')) {
				e.preventDefault();
				$container.removeClass('hdn')
				return false;
			}
		});
		$(close).on('click', function (e) {
			e.preventDefault();
			$container.addClass('hdn')
			return false;
		});
	}

	// Header Cart dropdown menu
	function toggleCart(cart, drop) {
		$('> a', $(cart)).on('click', function () {
			$(cart).toggleClass('opened');
		});
		$(document).on('click', function (e) {
			if (!$(e.target).closest(cart).length) {
				if ($(cart).hasClass("opened")) {
					$(cart).removeClass('opened');
				}
			}
		})
	}

	// Upload input
	$('.upload input[type="file"]').on('change', function () {
		$('.upload-path').val(this.value.replace('C:\\fakepath\\', ''));
	});

	// Scrolls to #link
	$('.scrollto').click(function (e) {
		e.preventDefault();
		var $target = $($(this).attr('href'));
		if ($target.length) {
			$('html,body').animate({
				scrollTop: $target.offset().top
			}, 'slow');
		}
	});

	// Lazy Load animation
	function onScrollInit(items, wW) {
		if (wW > 991) {
			if (!$('body').data('firstInit')) {
				items.each(function () {
					var $element = $(this),
						animationClass = $element.attr('data-animation'),
						animationDelay = $element.attr('data-animation-delay');
					$element.removeClass('no-animate');
					$element.css({
						'-webkit-animation-delay': animationDelay,
						'-moz-animation-delay': animationDelay,
						'animation-delay': animationDelay
					});
					var trigger = $element;
					trigger.waypoint(function () {
						$element.addClass('animated').addClass(animationClass);
						if ($element.hasClass('hoveranimation')) {
							$element.on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function () {
								$(this).removeClass("animated").removeClass("animation").removeClass(animationClass);
							});
						}
					}, {
						triggerOnce: true,
						offset: '90%'
					});
				});
				$('body').data('firstInit', true);
			}
		} else {
			items.each(function () {
				var $element = $(this);
				$element.addClass('no-animate')
			})
		}
	}

	// Google Map
	var mapStyle = [{
		featureType: "water",
		elementType: "geometry",
		stylers: [{
			color: "#e9e9e9"
		}, {
			lightness: 17
		}]
	}, {
		featureType: "landscape",
		elementType: "geometry",
		stylers: [{
			color: "#f5f5f5"
		}, {
			lightness: 20
		}]
	}, {
		featureType: "road.highway",
		elementType: "geometry.fill",
		stylers: [{
			color: "#ffffff"
		}, {
			lightness: 17
		}]
	}, {
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [{
			color: "#ffffff"
		}, {
			lightness: 29
		}, {
			weight: 0.2
		}]
	}, {
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [{
			color: "#ffffff"
		}, {
			lightness: 18
		}]
	}, {
		featureType: "road.local",
		elementType: "geometry",
		stylers: [{
			color: "#ffffff"
		}, {
			lightness: 16
		}]
	}, {
		featureType: "poi",
		elementType: "geometry",
		stylers: [{
			color: "#f5f5f5"
		}, {
			lightness: 21
		}]
	}, {
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [{
			color: "#dedede"
		}, {
			lightness: 21
		}]
	}, {
		elementType: "labels.text.stroke",
		stylers: [{
			visibility: "on"
		}, {
			color: "#ffffff"
		}, {
			lightness: 16
		}]
	}, {
		elementType: "labels.text.fill",
		stylers: [{
			saturation: 36
		}, {
			color: "#333333"
		}, {
			lightness: 40
		}]
	}, {
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	}, {
		featureType: "transit",
		elementType: "geometry",
		stylers: [{
			color: "#f2f2f2"
		}, {
			lightness: 19
		}]
	}, {
		featureType: "administrative",
		elementType: "geometry.fill",
		stylers: [{
			color: "#fefefe"
		}, {
			lightness: 20
		}]
	}, {
		featureType: "administrative",
		elementType: "geometry.stroke",
		stylers: [{
			color: "#fefefe"
		}, {
			lightness: 17
		}, {
			weight: 1.2
		}]
	}];


	function createMapHeader(id, mapZoom, lat, lng, markers) {
		var mapOptions = {
			zoom: mapZoom,
			scrollwheel: false,
			center: new google.maps.LatLng(lat, lng),
			styles: mapStyle
		};
		var mapHeader = new google.maps.Map(document.getElementById(id), mapOptions);
		var count,
			locations = markers;
		for (count = 0; count < locations.length; count++) {
			new google.maps.Marker({
				position: new google.maps.LatLng(locations[count][1], locations[count][2]),
				map: mapHeader,
				title: locations[count][0],
				icon: locations[count][4]
			});
		}
	}

	function createMapFooter(id, mapZoom, lat, lng, markers) {
		var mapOptions = {
			zoom: mapZoom,
			scrollwheel: false,
			center: new google.maps.LatLng(lat, lng),
			styles: mapStyle
		};
		var mapFooter = new google.maps.Map(document.getElementById(id), mapOptions);
		var count,
			locations = markers;
		for (count = 0; count < locations.length; count++) {
			new google.maps.Marker({
				position: new google.maps.LatLng(locations[count][1], locations[count][2]),
				map: mapFooter,
				title: locations[count][0],
				icon: locations[count][4]
			});
		}

		// Create the search box and link it to the UI element.
		var input = /** @type {HTMLInputElement} */ (
			document.getElementById('searchInput'));
		mapFooter.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		var searchBox = new google.maps.places.SearchBox(
			/** @type {HTMLInputElement} */
			(input));
		// [START region_getplaces]
		// Listen for the event fired when the user selects an item from the
		// pick list. Retrieve the matching places for that item.
		google.maps.event.addListener(searchBox, 'places_changed', function () {
			var places = searchBox.getPlaces();

			if (places.length == 0) {
				return;
			}
			for (var i = 0, marker; marker = markers[i]; i++) {
				marker.setMap(null);
			}

			// For each place, get the icon, place name, and location.
			markers = [];
			var bounds = new google.maps.LatLngBounds();
			for (var i = 0, place; place = places[i]; i++) {
				var image = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};

				// Create a marker for each place.
				var marker = new google.maps.Marker({
					map: map,
					icon: image,
					title: place.name,
					position: place.geometry.location
				});

				markers.push(marker);

				bounds.extend(place.geometry.location);
			}

			map.fitBounds(bounds);
		});
		// [END region_getplaces]
	}

	// END FUNCTIONS

})(jQuery);
