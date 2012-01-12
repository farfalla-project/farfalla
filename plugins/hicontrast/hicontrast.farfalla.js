// Farfalla plugin: High contrast

$(function() {


//  $('#farfalla_buttons').farfalla_add_button('toggle high contrast','toggle_hicontrast','h',function(){

	
/*
     From the high contrast CSS for Mozilla Firefox
     Black background/white text
     Proposed by Valusiana on 29th November 2011 on Ubuntu-it forums
     http://forum.ubuntu-it.org/index.php/topic,470585.msg3876938.html#msg3876938     
     
     Begin suggested code:
*/
    $('*').css({
      'color': 'white !important',
      'background-color': 'black !important'
	});

	$('input, textarea, select').css({
      'color': 'white !important',
      'background': 'black !important'
    });

    $('button, input[type="file"], input[type="submit"], input[type="button"], input[type="reset"]').css({
      'color': 'yellow !important',
      'background': 'navy !important'
    });
    
    $('a[href]').css({
      'text-decoration': 'underline !important'
    });

    $('a[href]:hover, a[href]:hover *').css({
      'color': 'black !important',   
      'background': 'white !important'
    });
    
    $('a[href] img').css({
      'border': 'thin solid white !important'
    });

    $('@media print *').css({
      'color': 'black !important',  
      'background': 'white !important'
    });
		
/* End suggested code */
		
    $('#farfalla_toolbar').css({
      'border':'2px solid #fff',
      'border-right':'0',
      'background':'black !important'
    });

    $('#farfalla_toolbar *').css({
      'background':'transparent'
    });

    $('#farfalla_change_profile').css({
      'border':'1px solid #fff'
    });
    
    $('#farfalla_handle').css({
      'background':'url('+farfalla_path+'images/toolbar/menu-handler.png)'
    });

//    return false;
//  });



});