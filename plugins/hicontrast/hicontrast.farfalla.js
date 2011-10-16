// Farfalla plugin: High contrast

$(function() {


  $('#farfalla_buttons').farfalla_add_button('toggle high contrast','toggle_hicontrast','h',function(){

		$('*').css({'background-color':'#000', 'color':'#fff', 'text-shadow':'none'});
		$('a:link').css('color','#0f0');
		$('a:visited').css('color','#00f');
		
		$('#farfalla_toolbar *').css({
			'background-color':'transparent'
		});

		$('#farfalla_toolbar').css({
			'border':'2px solid #fff',
			'border-right':'0',
			'background':'url('+farfalla_path+'images/toolbar/menu-content.png)'

		});

		$('#farfalla_change_profile').css({
			'border':'1px solid #fff'
		});
		
		$('#farfalla_handle').css({
			'background':'url('+farfalla_path+'images/toolbar/menu-handler.png)'
		});

	    return false;
  });



});