// Farfalla plugin: Negative

$(function() {


  $('#farfalla_buttons').farfalla_add_button('toggle negative','toggle_negative',function(){
		$('*').css('background-color','#000');

		alert(currentBgColor);

	    return false;
  });



});