// Farfalla plugin: Big Cursor. Changes the default mouse cursor to an enlarged one with high contrast.
// To do: adding options for distinct cursors.

// Google analytics monitoring code

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-9777827-29', 'farfalla-project.org');
  ga('send', 'pageview');



jQuery.noConflict();
(function($) {

  $(function(){

    $('<link></link>').attr({
      "rel":"stylesheet",
      "type":"text/css",
      "href":farfalla_path+"/plugins/bigcursor/bigcursor.farfalla.css"
    }).appendTo($('head'));

    $.bigcursor_on = function () {
      $('#bigcursorActivator').farfalla_switch_on('bigcursor');
      $('html').addClass('farfalla_bigcursor_arrow');
      $('a, input').addClass('farfalla_bigcursor_pointer');
    };

    $.bigcursor_off = function () {
      $('#bigcursorActivator').farfalla_switch_off('bigcursor')
      $('html').removeClass('farfalla_bigcursor_arrow');
      $('a, input').removeClass('farfalla_bigcursor_pointer');
    };

    $.bigcursor_on()

    $('#bigcursorActivator').click( function(){
      if($(this).hasClass('active')){
        $.bigcursor_off()
      } else {
        $.bigcursor_on()
      }
    });


  });

})(jQuery);