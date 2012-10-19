// Farfalla plugin: Big Cursor. Changes the default mouse cursor to an enlarged one with high contrast.
// To do: adding options for distinct cursors.

jQuery.noConflict();
(function($) {

  $(function(){

    $('<link></link>').attr({
      "rel":"stylesheet",
      "type":"text/css",
      "href":farfalla_path+"/plugins/bigcursor/bigcursor.farfalla.css"
    }).appendTo($('head'));

    $.bigcursor_on = function () {
      $('#bigcursorActivator').farfalla_switch_on();
      $('html').addClass('farfalla_bigcursor_arrow');
      $('a, input').addClass('farfalla_bigcursor_pointer');
    };


    $.bigcursor_off = function () {
      $('#bigcursorActivator').farfalla_switch_off()
      $('html').removeClass('farfalla_bigcursor_arrow');
      $('a, input').removeClass('farfalla_bigcursor_pointer');
    };


    $.bigcursor_on()

    $('#bigcursorActivator').click( function(){
      if($(this).attr('checked')=='checked'){
        $.bigcursor_on()
      } else {
        $.bigcursor_off()
      }
    });


  });

})(jQuery);