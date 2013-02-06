// Farfalla plugin: Clarifier. Transforms the typography of a document in a Dyslexia-friendly fashion.

jQuery.noConflict();
  (function($) {

    $(function() {

/*
      $('html').each( function(){
        console.log($(this).css('background-color'));
      })
*/
      $('<link></link>').attr({
        "rel":"stylesheet",
        "type":"text/css",
        "href":farfalla_path+"plugins/clarifier/clarifier.farfalla.css"
      }).appendTo($('head'));

      $.clarifier_on = function () {

        $('#clarifierActivator').farfalla_switch_on('clarifier');

        // Set <html> background color to cream, but only in case it is white
        if($('html').css('background-color')=='transparent'||$('html').css('background-color')=='rgba(0, 0, 0, 0)'){
          $('html').addClass('creamBackground');
        }

        $('*').not('#farfalla_container *').each(function(){

          if($(this).css('background-color')=='rgb(255, 255, 255)'){
            $(this).addClass('creamBackground');
          }

        });

        $('input, textarea').addClass('inputClarifier');

        // Set fonts to Tahoma, Arial, sans

        $('*').not('#farfalla_container *').addClass('fontClarifier');

        $('h1').not('#farfalla_container *').addClass('h1Clarifier');

        $('h2').not('#farfalla_container *').addClass('h2Clarifier');

        $('h1, h2, h3, h4, h5, h6, h7, h8, h9, h10').not('#farfalla_container *').addClass('boldClarifier');

        $('*').not('#farfalla_container *').each(function(){

          if($(this).css('text-align')=='justify'){
            $(this).addClass('leftAlignClarifier');
          }

        });

        // Set line height to 200% in <p> and <li> elements only

        $('p, li').not('#farfalla_container *').each(function(){
          $(this).addClass('linespacingClarifier');
        });

      }

      $.clarifier_off = function () {

        $('#clarifierActivator').farfalla_switch_off('clarifier');
        $('*').removeClass('creamBackground');
        $('input, textarea').removeClass('inputClarifier');
        $('*').removeClass('fontClarifier');
        $('h1').removeClass('h1Clarifier');
        $('h2').removeClass('h2Clarifier');
        $('h1, h2, h3, h4, h5, h6, h7, h8, h9, h10').removeClass('boldClarifier');
        $('*').removeClass('leftAlignClarifier');
        $('p, li').removeClass('linespacingClarifier');

      }


    $.clarifier_on()

    $('#clarifierActivator').click( function(){
      if($(this).hasClass('active')){
        $.clarifier_off()
      } else {
        $.clarifier_on()
      }
    });


  });

})(jQuery);