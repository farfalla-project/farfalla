$(function() {

	$(window).scroll(function(){
		if($('#monitor').height()<$(window).height()){
			$('#monitor')
			.css('margin-top', ($(window).scrollTop()) + 'px');
//		.animate({'marginTop': ($(window).scrollTop() + 30) + 'px'}, 'fast' );
		}
	});
	
	$('<div id="monitor">')
	.html('<p>This page is now farfallized</p>')
	.addClass('monitor')
	.prependTo('body')
	.fadeIn(3000)
		.hover(
		function(){ $(this).toggleClass('monitor_left'); }
	);

	$('<div id="highlighter">')
	.addClass('highlighter')
	.appendTo('body')
	.fadeIn(3000);
	
/*	$('<div id="toolbar">')
	.addClass('toolbar')
	.prependTo('body')
	.show('blind', { direction: 'vertical' }, 1000)
	.click(
		function(){ $(this).toggleClass('toolbar_explode'); }
	);
*/

//	$('#monitor').show('blind', { direction: 'vertical' }, 1000);
//	$('#monitor').fadeIn(3000);	


/*	$('#monitor').hover(
		function() {
			$(this).hide('blind', { direction: 'vertical' }, 1000);
		});
*/

	
// Highlight elements...

	$('h1, h2, h3, p, li, a, input, textarea, th, td, pre').each(function() {
		$(this).hover(
			function() {
				$(this).addClass('farfalla_red');
/*				$('#highlighter')
					.width($(this).width()+'px')
					.height($(this).height()+'px')
					.css('top', $(this).offset().top+'px')
					.css('left', $(this).offset().left+'px');
*/
				$('#monitor')
					.html($(this).html()+$(this).val());

			},
			function() {
				$(this).removeClass('farfalla_red');
			})
		});

// Virtual Keyboard
	
	$('input[type=text], input[class=lst], input[type=password], textarea')
		.keyboard({
			layout:'qwerty'
		});
		
		
	});
	
