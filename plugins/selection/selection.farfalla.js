jQuery.noConflict();
(function($) { 


  $(function() {


    function getSelected() {
      if(window.getSelection) { return window.getSelection(); }
      else if(document.getSelection) { return document.getSelection(); }
      else {
        var selection = document.selection && document.selection.createRange();
        if(selection.text) { return selection.text; }
        return false;
      }
      return false;
    }

    $('<div id="monitor" class="farfalla_hidden">').appendTo('body');

    $('html').mouseup(function(){
	  $('#monitor').html(''+getSelection())
    });

  });

})(jQuery);