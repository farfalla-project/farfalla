// Farfalla plugin: ##plugin_name##
// This is a template for new plugins. Replace ##plugin_name## with the exact name of a new plugin to start creating yours.


jQuery.noConflict();
(function($) {

  $(function() {

    $.farfalla_create_plugin_options('##plugin_name##');

    // New logic here

    $.##plugin_name##_on = function () {
      $('###plugin_name##Activator').farfalla_switch_on('##plugin_name##');
      $('.plugin_options').hide();
      $('###plugin_name##_options').slideDown('fast');

    // New logic here

    }

    $.##plugin_name##_off = function () {
      $('###plugin_name##Activator').farfalla_switch_off('##plugin_name##');
      $('###plugin_name##_options').hide();

    // New logic here

    }

    $.##plugin_name##_on();

    $('###plugin_name##_options_deactivate').click( function() {

      $.##plugin_name##_off();

    });

    $('###plugin_name##Activator').click( function(){

      $.##plugin_name##_on()

    });

  });

})(jQuery);
