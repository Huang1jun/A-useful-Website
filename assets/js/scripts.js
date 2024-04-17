/*
Author       : mucNM1 
Name         : Education of college students
Version      : 1.0
*/
(function($) {
	'use strict';
	
	jQuery(document).on('ready', function(){
	
		/*PRELOADER JS*/
		jQuery(window).on('load',function() {
		  setTimeout(function(){
			$('.preloaders').fadeToggle();
			}, 1500);
		});
		/*END PRELOADER JS*/	
			
		/*START MENU JS*/				
		$('#main-menu').slicknav({
			label: '',
			duration: 1000,
			easingOpen: "easeOutBounce",
			prependTo:'#mobile_menu',
			closeOnClick: true,
			easingClose:"swing", 
			easingOpen:"swing", 
			openedSymbol: "&#9660;",
			closedSymbol: "&#9658;" 	
		});
		
		if ($(window).scrollTop() > 200) {
              $('.fixed-top').addClass('menu-bg');
          } else {
              $('.fixed-top').removeClass('menu-bg');
          }
			$(window).on('scroll', function(){
				if ( $(window).scrollTop() > 70 ) {
					$('.site-navigation, .header-white, .header').addClass('navbar-fixed');
				} else {
					$('.site-navigation, .header-white, .header').removeClass('navbar-fixed');
				}
			});		  	
		/*END MENU JS*/					

		/*START TESTIMONIAL JS*/	
		$("#testimonial-slider").owlCarousel({
		   items:3,
			itemsDesktop:[1000,3],
			itemsDesktopSmall:[980,2],
			itemsTablet:[768,2],
			itemsMobile:[650,1],
			pagination:true,
			navigation:true,
			navigationText:["",""],
			slideSpeed:1000,
			autoPlay:false
		});
		/*END TESTIMONIAL JS*/

		/* START EVENT JS */
		 $("#event-slider").owlCarousel({
			items:3,
			itemsDesktop:[1199,3],
			itemsDesktopSmall:[979,2],
			itemsTablet:[768,2],
			itemsMobile:[600,1],
			pagination: false,
			navigation:true,
			navigationText:["",""],
			slideSpeed:1000,
			autoPlay:false
		});
		/* END EVENT JS */		
			
	}); 		
	
	/*START RANGE SLIDER*/
	    var rangeSlider = function(){
        var slider = $('.range-slider'),
            range = $('.range-slider input[type="range"]'),
            value = $('.range-value');
        slider.each(function(){
            value.each(function(){
                var value = $(this).prev().attr('value');
                $(this).html(value);
            });
            range.on('input', function(){
                $(this).next(value).html(this.value);
            });
        });
    };
    rangeSlider();
	/*END RANGE SLIDER*/
	
	/*INITIATE PURE COUNTER*/
		new PureCounter();
	
	/*START WOW ANIMATION JS*/
	  new WOW().init();	
	/*END WOW ANIMATION JS*/	

	/* START Q&A FUNCTIONALITY */
		$('.subscribe__btn').on('click', function(event) {
			event.preventDefault();
		
			var $btn = $(this);
			var question = $('.home_si').val().trim();
		
			$('#response').empty();
			if (!question) {
				$('#response').html('请输入问题。');
				return;
			}
		
			$btn.prop('disabled', true).text('提问中...');
			$('#response').html('<div class="loader"></div>');
		
			$.ajax({
				url: 'http://127.0.0.1:5500/api/query', 
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({ question: question }),
				success: function(response) {
					console.log("Received response:", response);
					if(response.result) {
						$('#response').html(response.result);
					} else {
						console.error("Unexpected response format:", response);
						$('#response').html("Received unexpected response format.");
					}
				},
				error: function(xhr, status, error) {
					console.log("AJAX error response:", xhr.responseText);
					var errorMessage = xhr.status === 0 ? '无法连接到API，请检查您的网络连接。' :
									   xhr.status === 404 ? 'API端点未找到。' :
									   xhr.status === 500 ? '服务器内部错误。' :
									   '无法获取回答，请稍后再试。';
					$('#response').html(errorMessage);
				},
				complete: function() {
					$btn.prop('disabled', false).text('提问');
				}
			});

			var windowHeight = $(window).height();
			var responseHeight = $('#response').outerHeight(true);
			var offsetTop = $('#response').offset().top;
			var scrollTarget = offsetTop - (windowHeight / 2) + (responseHeight / 2);
			
			$('html, body').animate({
				scrollTop: scrollTarget
			}, 100);
		});
	/* END Q&A FUNCTIONALITY */
			
	/* JUMP */
		document.addEventListener('DOMContentLoaded', function() {

			var isIndexPage = document.querySelector('.home_si') !== null;
			var isAskAIPage = document.querySelector('.ai_input') !== null;
			
			if (window.location.pathname.endsWith('index.html')) {
				var btn = document.querySelector('.subscribe__btn');

				btn.addEventListener('click', function() {
					window.location.href = 'askAI.html'; 
				});
			}
		
			if (window.location.pathname.endsWith('askAI.html')) {
				var params = new URLSearchParams(window.location.search);
				var question = params.get('question');
				var input = document.querySelector('.ai_input');
				var askButton = document.querySelector('.ai_askBtn');
		
				if (question) {
					input.value = decodeURIComponent(question);
					setTimeout(() => askButton.click(), 50);
				}
			}
		});
})(jQuery);

  

