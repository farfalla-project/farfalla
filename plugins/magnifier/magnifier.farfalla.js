$(function() {


	jQuery.getScript(farfalla_path +'jquery.htmlClean-min.js');

	jQuery.expr[':'].hasText = function(element, index) {
     // if there is only one child, and it is a text node
     if (element.childNodes.length == 1 && element.firstChild.nodeType == 3) {
        return jQuery.trim(element.innerHTML).length > 0;
     }
     return false;
	};

	$('ul').css('overflow','hidden');
	
	$('<div id="farfalla_debug">').prependTo('body');

	$('<div id="monitor">')
	.html('<p style="font-size:30pt">Farfalla Magnification module: active</p>')
	.addClass('monitor')
	.prependTo('body')
	.fadeIn(300);

	$('<div id="highlighter">')
	.addClass('highlighter')
	.prependTo('body');

	$('#highlighter').click(
		function() {
			$('.farfalla-hover').trigger('click')
		}
	);

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
	
	$('#monitor div').removeClass('*');


	
	
	// Highlight elements...

	$('h1, h2, h3, h4, h5, p, ul, ol, input, textarea, th:hasText, td:last-child, td:hasText, pre, label, dt, dd, div:hasText').each(function() {
		$(this).hover(
			function() {
			
			$('.farfalla-hover').removeClass('farfalla-hover');
			$(this).addClass('farfalla-hover');
			
			var offset = $(this).offset();
			$('#highlighter').animate({'height' : $(this).height() + 10, 'left' : (offset.left - 6) + 'px', 'top' : (offset.top - 10) + 'px', 'width' : $(this).width() + 12 }, 300);
			
//			$('').animate({'marginTop': ($(this).offset.top) + 'px' }, 'fast');

	/*			$(this).addClass('farfalla_red');
				$(this).parents().removeClass('farfalla_red');*/

				$('#monitor')
					.html($.htmlClean($(this).html(), { allowedTags : ['a', 'ul', 'ol', 'li', 'br', 'p'] })+$(this).val())
					.css({'margin-top' : ($(window).scrollTop()) + 'px', 'font-size' : '30pt' });

				$('#monitor a').css({ 'font-size' : '30pt' }).each( function(i){
   					$(this).append('<span style="color:violet;"> ['+ (i+1) +']</span>');
				});

			},
			function() {
//				$(this).removeClass('farfalla_red');
			// kept this, just in case...

			})
		});

	$('html').keydown(function(event) {
		
	    var requestedAction = null;
	
    	switch (event.keyCode){

/*up*/          case 38 : $('#monitor').animate({'marginTop': '+=50px'}, 'fast' ); return false; break;
/*down*/        case 40 : $('#monitor').animate({'marginTop': '-=50px' }, 'fast' ); return false; break;
/*right*/       case 39 : $('#monitor').animate({'marginLeft': '50%' }, 'fast' ); return false; break;
/*left*/        case 37 : $('#monitor').animate({'marginLeft': '0' }, 'fast' ); return false; break;
/* + */         case 107 : $('div.monitor').animate({'fontSize': '+=10pt' }, 'fast' ); return false; break;
/* + chrome */  case 187 : $('div.monitor').animate({'fontSize': '+=10pt' }, 'fast' ); return false; break;

/* . */         case 190 : $('#monitor').css('width', '45%').animate({'marginLeft': '50%' }, 'fast' ); return false; break;
/* , */         case 188 : $('#monitor, #highlighter').toggleClass('hidden'); return false; break;

/* - */         case 109 : $('div.monitor').animate({'fontSize': '-=10pt' }, 'fast' ); return false; break;
/* - chrome */  case 189 : $('div.monitor').animate({'fontSize': '-=10pt' }, 'fast' ); return false; break;

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


//			$('#farfalla_debug').html(event.keyCode);
			
							
	});



});

