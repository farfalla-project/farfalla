$(function() {

	$('<div id="monitor">')
	.html('<p>The Magnification plugin is now active</p>')
	.addClass('monitor')
	.prependTo('body')
	.fadeIn(300);

	$(window).scroll(function(){
		if($('#monitor').height()<$(window).height()){
			$('#monitor')
			.css('margin-top', ($(window).scrollTop()) + 'px');
//		.animate({'marginTop': ($(window).scrollTop() + 30) + 'px'}, 'fast' );
		}
	});
	
	$('#monitor').mouseover( 
		function(){ 
		$(this).toggleClass('monitor_left')
/*
			if($(this).hasClass('monitor_left')){
				$(this).animate({'marginLeft': '50%' }, 'fast'); 
				$(this).removeClass('monitor_left');
			} else {
				alert('no monitor_left');
				$(this).animate({'marginLeft': 0 }, 'fast'); 
				$(this).addClass('monitor_left');
			}
*/		}
	);

	
	
	// Highlight elements...

	$('h1, h2, h3, p, li, a, input, textarea, th, td, pre').each(function() {
		$(this).hover(
			function() {
				$(this).addClass('farfalla_red');
				$(this).parent().removeClass('farfalla_red');

				$('#monitor')
					.html($(this).html()+$(this).val());

			},
			function() {
				$(this).removeClass('farfalla_red');
			})
		});

/*	$('html').keypress(function(event) {

		return false;					
	});
*/


});

