// Farfalla plugin: Font Size

jQuery.noConflict();
(function($) {

  $(function() {

    $.farfalla_create_plugin_options('fontsize');

    $.farfalla_change_size = function (val) {
      var value = 1+val*0.1;
      $('#farfalla-fontsize-container').css({
        'zoom': value,
        '-moz-transform': 'scale('+value+')',
        '-moz-transform-origin': 'top left'
      });
      $('#farfalla-fontsize-container').width($('body').width()/value);
      $.farfalla_set_option('increase',val);
    }

    $.farfalla_reset_size = function () {
      $('#farfalla-fontsize-container').css({
        'zoom': 1,
        '-moz-transform': 'scale(1)'
      });
      $('#farfalla-fontsize-container').width($('body').width());
      $.farfalla_set_option('increase',0);
    }

    $.farfalla_get_option('increase', function(data){

        var increase = 0

        var value = data.value;

        if(value){
          var increase = parseFloat(data.value);
        }

        // Increase Font Size
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_increase', '+', function(){

          increase+=1;
          var value= increase;
          $.farfalla_change_size(value);
          return increase;
        });

        // Decrease Font Size
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_decrease', '-', function(){

          increase+=-1;
          var value= increase;
          $.farfalla_change_size(value);
          return increase;
        });

        // Reset Font Size

        $.farfalla_add_ui('fontsize', 'button', 'fontsize_reset', 'reset', function(){

          $.farfalla_reset_size();
          increase=0;
          return increase;

        });

      });

    $.fontsize_on = function () {

      if($('#farfalla-fontsize-container').length==0){
        $('body > *:not(#farfalla_container, #farfalla_badge)').wrapAll('<div id="farfalla-fontsize-container" />');
      }

      $('#fontsizeActivator').farfalla_switch_on('fontsize');

      $.farfalla_get_option('increase', function(data){

        // restore font size on plugin activation

        if(data.value > 0){
          $.farfalla_change_size(data.value);
        }

        $('.plugin_options').not('#fontsize_options').slideUp('fast');
        $('#fontsize_options').slideDown('fast');

      });

    }

    $.fontsize_off = function () {

      $('#fontsize_options').hide();
      $.farfalla_reset_size();
      $('#fontsizeActivator').farfalla_switch_off('fontsize');

    }

    $('#fontsize_options_deactivate').click( function() {

      $.fontsize_off();

    });

    $('#fontsizeActivator').click( function(){

      $.fontsize_on();

    });

    $.fontsize_on();

  });
})(jQuery);
