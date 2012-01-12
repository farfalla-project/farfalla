// Farfalla plugin: Font Size

$(function() {



  // Increase Font Size
  $('#farfalla_buttons').farfalla_add_button('+','fontsize_increase','a',function(){
	    $('*').css({
	    	'font-size': function(index, value) {
        		return parseFloat(value) * 1.1;
      		},
      		'line-height' : '130%'
      	}); 
	    return false;
  });

  // Decrease Font Size
  $('#farfalla_buttons').farfalla_add_button('-','fontsize_decrease','z',function(){
	    $('*').css({
	    	'font-size': function(index, value) {
        		return parseFloat(value) * 0.9;
      		},
      		'line-height' : '130%'
      	}); 
	    return false;
  });

});