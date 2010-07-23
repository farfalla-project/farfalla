$(function() {

	$('<div id="monitor">')
	.html('<p>The Magnification plugin is now active</p>')
	.addClass('monitor')
	.prependTo('body')
	.hover( 
		function(){ $(this).animate({'marginLeft': 0 }, 'fast'); },
		function(){ $(this).animate({'marginLeft': '50%' }, 'fast'); }

	) 
	.fadeIn(3000);

	$(window).scroll(function(){
		if($('#monitor').height()<$(window).height()){
			$('#monitor')
			.css('margin-top', ($(window).scrollTop()) + 'px');
//		.animate({'marginTop': ($(window).scrollTop() + 30) + 'px'}, 'fast' );
		}
	});
	
//	$('.monitor_left').hover(
//		function(){ $(this).removeClass(); }	
//	);  
	
	
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

