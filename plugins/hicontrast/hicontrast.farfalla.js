// Farfalla plugin: High contrast

$(function() {


  $('#farfalla_buttons').farfalla_add_button('toggle high contrast','toggle_hicontrast','h',function(){

		$('*').css({'background-color':'#000', 'color':'#fff'});
		$('a:link').css('color','#0f0');
		$('a:visited').css('color','#00f');

		$('#farfalla_toolbar *').css({
			'background-color':'transparent'
		});

		$('#farfalla_toolbar').css({
			'border':'2px solid #fff',
			'border-right':'0'
		});

		$('#farfalla_change_profile').css({
			'border':'1px solid #fff'
		});

	    return false;
  });



});