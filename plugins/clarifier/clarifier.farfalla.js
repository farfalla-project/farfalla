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
        "href":farfalla_path+"/plugins/clarifier/clarifier.farfalla.css"
      }).appendTo($('head'));

      $.clarifier_on = function () {

        $('#clarifierActivator').farfalla_switch_on();

        // Set <html> background color to cream, but only in case it is white

        if($('html').css('background-color')=='transparent'||$('html').css('background-color')=='rgba(0, 0, 0, 0)'){
          $('html').addClass('creamBackground');
        }

        $('*').each(function(){

          if($(this).css('background-color')=='rgb(255, 255, 255)'){
            $(this).addClass('creamBackground');
          }

        });

        $('input, textarea').addClass('inputClarifier');

        // Set fonts to Tahoma, Arial, sans

        $('*').addClass('fontClarifier');

        $('h1').addClass('h1Clarifier');

        $('h2').addClass('h2Clarifier');

        $('h1, h2, h3, h4, h5, h6, h7, h8, h9, h10').addClass('boldClarifier');

        $('*').each(function(){

          if($(this).css('text-align')=='justify'){
            $(this).addClass('leftAlignClarifier');
          }

        });

        // Set line height to 200% in <p> and <li> elements only

        $('p, li').each(function(){
          $(this).addClass('linespacingClarifier');
        });

      }

      $.clarifier_off = function () {

        $('#clarifierActivator').farfalla_switch_off();
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
      if($(this).attr('checked')=='checked'){
        $.clarifier_on()
      } else {
        $.clarifier_off()
      }
    });


  });

})(jQuery);