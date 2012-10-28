jQuery.noConflict();
(function($) {

  $(function() {

	$('<div id="farfalla-virtual-cursor">')
	.addClass('ui-corner-all')
	.css({
	  'position':'absolute',
	  'display':'block',
	  'width':'50px',
	  'height':'50px',
	  'background':'red',
	  'margin': '100px 50%'
	})
	.prependTo('body')
	.fadeIn(300);







	$('html').keydown(function(event) {

        $('#farfalla-virtual-cursor').html($(this).css('top'));
//        $('#farfalla-virtual-cursor');

	    var requestedAction = null;

    	switch (event.keyCode){

          /*up*/
          case 38 : $('#farfalla-virtual-cursor').css({'marginTop': '-=10px'}); return false; break;

          /*down*/
          case 40 : $('#farfalla-virtual-cursor').css({'marginTop': '+=10px' }); return false; break;

          /*right*/
          case 39 : $('#farfalla-virtual-cursor').css({'marginLeft': '+=10px' }); return false; break;

          /*left*/
          case 37 : $('#farfalla-virtual-cursor').css({'marginLeft': '-=10px' }); return false; break;

          /*spacebar*/
          case 32 : console.log('click'); return false; break;


    	  default:requestedAction='null';
	    }


//			$('#farfalla_debug').html(event.keyCode);

	
	});



  });

})(jQuery);
