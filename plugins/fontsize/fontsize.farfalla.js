// Farfalla plugin: Font Size

jQuery.noConflict();
(function($) { 

 $(function() {


    
  $.farfalla_get_option('increase', function(data){

    var increase = 0

// restore font size on page load

    var val = 1+(0.1*data.value);
    var mozval = 'scale('+val+')';
    $('body').css({
      'zoom': val,
      '-moz-transform': mozval,
      '-moz-transform-origin': '0 0'
    });

    if(data.value){    
      var increase = parseFloat(data.value);
    }

    // Increase Font Size
    $('#farfalla_buttons').farfalla_add_button('+','+','fontsize_increase','a','green','#fff',function(){

      var val= 1+(0.1*increase)
      var mozval = 'scale('+val+')';

      $('body').css({
        'zoom': val,
        '-moz-transform': mozval,
        '-moz-transform-origin': '0 0'
      });

      increase+=1;

      $.farfalla_set_option('increase',increase);
      return increase;
    });

  // Decrease Font Size
    $('#farfalla_buttons').farfalla_add_button('-','-','fontsize_decrease','z','red', '#fff', function(){

      var val= 1+(0.1*increase)
      var mozval = 'scale('+val+')';

      $('body').css({
        'zoom': val,
        '-moz-transform': mozval,
        '-moz-transform-origin': '0 0'
      });

      increase+=-1;
      $.farfalla_set_option('increase',increase);
      return increase;
    });
    
  // Reset Font Size
    $('#farfalla_buttons').farfalla_add_button('reset font','reset','fontsize_reset','r','yellow','#000',function(){

      $('body').css({
        'zoom': 0,
        '-moz-transform': 'scale(0)',
        '-moz-transform-origin': '0 0'
      }); 
      increase=0;
      $.farfalla_set_option('increase',increase);
      return increase;

    });

  
  });

 });
})(jQuery);
