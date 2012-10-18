// Farfalla plugin: Font Size

jQuery.noConflict();
(function($) { 

  $(function() {




    $.farfalla_create_plugin_options('fontsize_options');

    $.farfalla_change_size = function (val) {
        var mozval = 'scale('+val+')';
        $('body').css({
          'zoom': val,
          '-moz-transform': mozval,
          '-moz-transform-origin': '0 0'
        });
        $('body').width($(window).width()/val);
    }

    $.farfalla_get_option('increase', function(data){

        var increase = 0

        // restore font size on plugin load

        var value = 1+(0.1*data.value);

        $.farfalla_change_size(value);

        if(data.value){
          var increase = parseFloat(data.value);
        }

        // Increase Font Size
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_increase', '+', function(){

          increase+=1;
          var value= 1+(0.1*increase)

          $.farfalla_change_size(value);

          $.farfalla_set_option('increase',increase);
          return increase;
        });

        // Decrease Font Size
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_decrease', '-', function(){
     
          increase+=-1;
          var value= 1+(0.1*increase)

          $.farfalla_change_size(value);

          $.farfalla_set_option('increase',increase);
          return increase;
        });
     
        // Reset Font Size
/*
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_reset', 'reset', function(){

          $('body').css({
            'zoom': 0,
            '-moz-transform': 'scale(1)'
//            '-moz-transform-origin': '0 0'
          }); 
          increase=0;
          $.farfalla_set_option('increase',increase);
          return increase;

        });
*/
   
      });


    $.fontsize_on = function () {    

      $.farfalla_get_option('increase', function(data){

        // restore font size on plugin activation

        var val = 1+(0.1*data.value);

        $.farfalla_change_size();

        if(data.value){    
          var increase = parseFloat(data.value);
        }

        $('#fontsize_options').fadeIn('fast');
        $('#farfalla_toolbar_shade').show();
        
      });
     
    }
    
    $.fontsize_off = function () {

      $('#fontsize_options').hide();
      $('#farfalla_toolbar_shade').hide();
      $('body').css({
        'zoom': 0,
        '-moz-transform': 'scale(1)'
      }); 
	  $('body').width("");

    }
    
    $('#fontsize_options_deactivate').click( function() {

      $('#fontsizeActivator').parent('div').click()

    });

    $('#fontsize_options_confirm').click( function() {

      $('#fontsize_options').hide();
      $('#farfalla_toolbar_shade').hide();

    });


   
    $.fontsize_on()

    $('#fontsizeActivator').click( function(){
 
      if($(this).attr('checked')=='checked'){

        $.fontsize_on()

      } else {

        $.fontsize_off()

      }
 
    });



  });
})(jQuery);
