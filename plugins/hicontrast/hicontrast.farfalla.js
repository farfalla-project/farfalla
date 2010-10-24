// Farfalla plugin: High contrast

$(function() {


  $('#farfalla_buttons').farfalla_add_button('toggle high contrast','toggle_hicontrast',function(){
		$('*').css({'background-color':'#000', 'color':'#fff'});
		$('a:link').css('color','#0f0');
		$('a:visited').css('color','#00f');


	    return false;
  });
  


});