// Farfalla plugin: hicontrast
// This plugin allows to change the background and foreground color on pages.

// Google analytics monitoring code

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-9777827-26', 'farfalla-project.org');
  ga('send', 'pageview');


jQuery.noConflict();
(function($) {

  $(function() {

    $.farfalla_create_plugin_options('hicontrast');

    $.farfalla_add_ui_section('hicontrast',$.__('Color_schemes'));

    var colorSchemes = new Array("black_white","black_green","black_lightblue","black_yellow","blue_white","cyan_black","lightblue_black","lightyellow_black","white_black","yellow_black");

    $.each(colorSchemes, function(index, value){
      $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_'+value, index, function(){

        $('#farfalla_active_option input').unwrap();
        $.farfalla_remove_plugin_css('hicontrast');
        $.farfalla_add_css('hicontrast','hicontrast_'+value);
        $.farfalla_set_option('colorscheme',value);
        $('#hicontrast_'+value+'_button').wrap('<div id="farfalla_active_option" class="donttouchme"></div>');

      });
    });

    $.farfalla_get_option('colorscheme', function(data){

      // restore color scheme on load

      if(data.value){
        $('#hicontrast_'+data.value+'_button').click();
      }

    });

    $.farfalla_add_ui_section('hicontrast',$.__('Actions'));

    $.farfalla_add_ui('hicontrast', 'button', 'hicontrast_reset', 'reset', function(){

      $.farfalla_remove_plugin_css('hicontrast');
      $('#farfalla_active_option input').unwrap();
      $.farfalla_set_option('colorscheme');


    });


    $.hicontrast_on = function () {

      $('#hicontrastActivator').farfalla_switch_on('hicontrast');
      $('.plugin_options').not('#hicontrast_options').slideUp('fast');
      $('#hicontrast_options').slideDown('fast');
      $('#farfalla_container *').addClass('donttouchme');

    }

    $.hicontrast_off = function () {

      $('#hicontrastActivator').farfalla_switch_off('hicontrast');
      $('#hicontrast_options').hide();
      $.farfalla_remove_plugin_css('hicontrast');
      $('#farfalla_active_option input').unwrap();
      $.farfalla_set_option('colorscheme');

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