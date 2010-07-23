$(function() {

	$('<div id="farfalla_debug">').prependTo('body');

	$('<div id="monitor">')
	.html('<p>Farfalla Magnification module: active</p>')
	.addClass('monitor')
	.prependTo('body')
	.fadeIn(300);

	$(window).scroll(function(){
		if($('#monitor').height()<$(window).height()){
			$('#monitor')
			.css('margin-top', ($(window).scrollTop()) + 'px');
//		.animate({'marginTop': ($(window).scrollTop()) + 'px'}, 'fast' );
		}
	});
	
	$('#monitor').mouseover( 
		function(){ $(this).toggleClass('monitor_left') }
	);
	

	
	
	// Highlight elements...

	$('h1, h2, h3, h4, h5, p, li, input, textarea, th, td, pre').each(function() {
		$(this).hover(
			function() {
				$(this).addClass('farfalla_red');
				$(this).parent().removeClass('farfalla_red');

				$('#monitor')
					.html($(this).html()+$(this).val())
					.css('margin-top', ($(window).scrollTop()) + 'px');

				$('#monitor a').each( function(i){
   					$(this).append('<span style="color:violet;"> ['+ (i+1) +']</span>');
				});

			},
			function() {
				$(this).removeClass('farfalla_red');
			})
		});

	$('html').keydown(function(event) {
		
	    var requestedAction = null;

 
	
    	switch (event.keyCode){

/*up*/      case 38 : $('#monitor').animate({'marginTop': '+=50px'}, 'fast' ); return false; break;
/*down*/    case 40 : $('#monitor').animate({'marginTop': '-=50px' }, 'fast' ); return false; break;
/*right*/   case 39 : $('#monitor').animate({'marginLeft': '50%' }, 'fast' ); break;
/*left*/    case 37 : $('#monitor').animate({'marginLeft': '0' }, 'fast' ); break;
/* - */     case 107 : $('#monitor').css('width', '45%').animate({'marginLeft': '50%' }, 'fast' ); return false; break;
/* - chrome */     case 187 : $('#monitor').css('width', '45%').animate({'marginLeft': '50%' }, 'fast' ); return false; break;

/* + */     case 109 : $('#monitor').css('width', '24%').animate({'marginLeft': '71%' }, 'fast' ); return false; break;
/* + chrome */     case 189 : $('#monitor').css('width', '24%').animate({'marginLeft': '71%' }, 'fast' ); return false; break;

/* 1 */     case 49 : document.location.href = $('#monitor a').eq(0).attr('href'); return false; break;
/* 2 */     case 50 : document.location.href = $('#monitor a').eq(1).attr('href'); return false; break;
/* 3 */     case 51 : document.location.href = $('#monitor a').eq(2).attr('href'); return false; break;
/* 4 */     case 52 : document.location.href = $('#monitor a').eq(3).attr('href'); return false; break;
/* 5 */     case 53 : document.location.href = $('#monitor a').eq(4).attr('href'); return false; break;
/* 6 */     case 54 : document.location.href = $('#monitor a').eq(5).attr('href'); return false; break;
/* 7 */     case 55 : document.location.href = $('#monitor a').eq(6).attr('href'); return false; break;
/* 8 */     case 56 : document.location.href = $('#monitor a').eq(7).attr('href'); return false; break;
/* 9 */     case 57 : document.location.href = $('#monitor a').eq(8).attr('href'); return false; break;
/* 0 */     case 48 : document.location.href = $('#monitor a').eq(9).attr('href'); return false; break;

    	    default:requestedAction='null';
	    }


			$('#farfalla_debug').html(event.keyCode);
			
							
	});



});

