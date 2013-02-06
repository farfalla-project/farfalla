// Farfalla plugin: hicontrast
// This plugin allows to change the background and foreground color on pages.


jQuery.noConflict();
(function($) {

  $(function() {

    $.farfalla_create_plugin_options('hicontrast');

    $.farfalla_hicontrast_background_on = function(color){
      $('link[href*="hicontrast_background"]').remove();
      $.farfalla_add_css('hicontrast','hicontrast_background_'+color);
      $('*').not('#farfalla_container *').each(function(){
          $(this).addClass('hicontrastBackground');
      })
    }

    $.farfalla_hicontrast_background_off = function(){
      $('.hicontrastBackground').removeClass('hicontrastBackground');
    }


    $.farfalla_add_ui_section('hicontrast','Text color');

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_foreground_white', 'w', function(){

      $('link[href*="hicontrast_foreground"]').remove();
      $.farfalla_add_css('hicontrast','hicontrast_foreground_white');

    });

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_foreground_black', 'b', function(){

      $('link[href*="hicontrast_foreground"]').remove();
      $.farfalla_add_css('hicontrast','hicontrast_foreground_black');

    });

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_foreground_green', 'g', function(){

      $('link[href*="hicontrast_foreground"]').remove();
      $.farfalla_add_css('hicontrast','hicontrast_foreground_green');

    });

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_foreground_yellow', 'y', function(){

      $('link[href*="hicontrast_foreground"]').remove();
      $.farfalla_add_css('hicontrast','hicontrast_foreground_yellow');

    });

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_foreground_lightblue', 'lb', function(){

      $('link[href*="hicontrast_foreground"]').remove();
      $.farfalla_add_css('hicontrast','hicontrast_foreground_lightblue');

    });

    $.farfalla_add_ui_section('hicontrast','Background color');

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_background_black', 'B', function(){

      $.farfalla_hicontrast_background_on('black');

    });

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_background_white', 'W', function(){

      $.farfalla_hicontrast_background_on('white');

    });

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_background_lightyellow', 'LY', function(){

      $.farfalla_hicontrast_background_on('lightyellow');

    });

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_background_lightblue', 'LB', function(){

      $.farfalla_hicontrast_background_on('lightblue');

    });

    $.farfalla_add_ui_section('hicontrast','Other');

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_reset', 'reset', function(){

      $('link[href*="hicontrast_foreground"]').remove();
      $('link[href*="hicontrast_background"]').remove();
      $.farfalla_hicontrast_background_off();
    });


    $.hicontrast_on = function () {
      $('#hicontrastActivator').farfalla_switch_on('hicontrast');
      $('.plugin_options').slideUp('fast');
      $('#hicontrast_options').slideDown('fast');
    }

    $.hicontrast_off = function () {
      $('#hicontrastActivator').farfalla_switch_off('hicontrast');
      $('#hicontrast_options').hide();
      $('link[href*="hicontrast_foreground"]').remove();
      $('link[href*="hicontrast_background"]').remove();
      $.farfalla_hicontrast_background_off();
    }

    $.hicontrast_on();

    $('#hicontrast_options_deactivate').click( function() {

      $.hicontrast_off();

    });

    $('#hicontrastActivator').click( function(){

      $.hicontrast_on()

    });

  });

})(jQuery);