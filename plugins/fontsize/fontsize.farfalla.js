// Farfalla plugin: Font Size

$(function() {



  // Increase Font Size
  $('#farfalla_buttons').farfalla_add_button('+','fontsize_increase',function(){
	    var currentFontSize = $('html').css('font-size');
	    var currentFontSizeNum = parseFloat(currentFontSize, 10);
	    var newFontSize = currentFontSizeNum*1.2;
	    $('*').css('font-size', newFontSize).css('padding-bottom','0.2ex');
	    return false;
  });
  
  // Decrease Font Size
  $('#farfalla_buttons').farfalla_add_button('-','fontsize_decrease',function(){
  		var currentFontSize = $('html').css('font-size');
  		var currentFontSizeNum = parseFloat(currentFontSize, 10);
  		var newFontSize = currentFontSizeNum*0.8;
		$('*').css('font-size', newFontSize).css('padding-bottom','0.2ex');
	    return false;
  });

});