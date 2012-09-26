// Farfalla plugin: Font Size

jQuery.noConflict();
(function($) { 

  $(function() {


    $('<div></div>')
     .attr({
       'id':'fontsize_options',
       'class':'plugin_options'
     })
     .hide()
     .appendTo('body');

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
        $('#fontsize').farfalla_add_ui('fontsize', 'button', 'fontsize_increase', '+', function(){

          increase+=1;
          var val= 1+(0.1*increase)
          var mozval = 'scale('+val+')';

          $('body').css({
            'zoom': val,
            '-moz-transform': mozval,
            '-moz-transform-origin': '0 0'
          });


		  $('html').css({'width':$(window).width()+'px'});

          console.log($(window).width());


          $.farfalla_set_option('increase',increase);
          return increase;
        });

        // Decrease Font Size
        $('#fontsize').farfalla_add_ui('fontsize', 'button', 'fontsize_decrease', '-', function(){
     
          increase+=-1;
          var val= 1+(0.1*increase)
          var mozval = 'scale('+val+')';

          $('body').css({
            'zoom': val,
            '-moz-transform': mozval,
            '-moz-transform-origin': '0 0',
            'width':'100%'
          });

          $.farfalla_set_option('increase',increase);
          return increase;
        });
     
        // Reset Font Size
        $('#fontsize').farfalla_add_ui('fontsize', 'button', 'fontsize_reset', 'reset', function(){

          $('body').css({
            'zoom': 0,
            '-moz-transform': 'scale(1)',
            '-moz-transform-origin': '0 0'
          }); 
          increase=0;
          $.farfalla_set_option('increase',increase);
          return increase;

        });

   
      });


    $.fontsize_on = function () {    

      $.farfalla_get_option('increase', function(data){

        // restore font size on plugin activation

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

        $('#fontsize_options').fadeIn('slow');

      });
     
    }
    
    $.fontsize_off = function () {

      $('#fontsize_options').hide();
      $('body').css({
        'zoom': 0,
        '-moz-transform': 'scale(1)',
        '-moz-transform-origin': '0 0'
      }); 
      
    }
   
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
