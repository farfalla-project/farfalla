// Farfalla plugin: Big Cursor. Changes the default mouse cursor to an enlarged one with high contrast.
// To do: adding options for distinct cursors.

jQuery.noConflict();
(function($) {

  $(function(){

    $('html').css("cursor","url('"+farfalla_path+"/plugins/bigcursor/cursors/Arrow.cur'), auto");
    $('a').css("cursor","url('"+farfalla_path+"/plugins/bigcursor/cursors/Pointer.cur'), auto");

  });

})(jQuery);