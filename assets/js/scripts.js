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
			
	}); 		
	
	/*INITIATE PURE COUNTER*/
		new PureCounter();
	
	/*START WOW ANIMATION JS*/
	  new WOW().init();	
	/*END WOW ANIMATION JS*/	

	// 初始化云环境
	var app = cloudbase.init({
		env: 'awebsite-0glc3eh6b1080812' 
	});

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

		// 调用云函数
		app.callFunction({
			name: 'queryFunction', // 云函数名称
			data: {
				question: question
			}
		}).then((res) => {
			console.log("Received response:", res);
			$('#response').html(res.result); // 显示云函数返回的结果
			$btn.prop('disabled', false).text('提问');
		}).catch((err) => {
			console.error("Error calling cloud function:", err);
			$('#response').html('无法获取回答，请稍后再试。'); // 显示错误消息
			$btn.prop('disabled', false).text('提问');
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

