// Farfalla plugin: Font Size

jQuery.noConflict();
(function($) { 

  $(function() {




    $.farfalla_create_plugin_options('fontsize_options');

    $.farfalla_get_option('increase', function(data){

        var increase = 0

        // restore font size on plugin load

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
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_increase', '+', function(){

          increase+=1;
          var val= 1+(0.1*increase)
          var mozval = 'scale('+val+')';

          $('body').css({
            'zoom': val
            ,'-moz-transform': mozval
//            ,'-moz-transform-origin': '0 0'
          });


		  $('body').css({'width':$(window).width()+'px'});

          console.log($(window).width());


          $.farfalla_set_option('increase',increase);
          return increase;
        });

        // Decrease Font Size
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_decrease', '-', function(){
     
          increase+=-1;
          var val= 1+(0.1*increase)
          var mozval = 'scale('+val+')';

          $('body').css({
            'zoom': val,
            '-moz-transform': mozval
//            '-moz-transform-origin': '0 0',
//            'width':'100%'
          });

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
        var mozval = 'scale('+val+')';
        $('body').css({
          'zoom': val,
          '-moz-transform': mozval
//          '-moz-transform-origin': '0 0'
        });

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
