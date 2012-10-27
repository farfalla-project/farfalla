// Farfalla plugin: Virtual Keyboard

jQuery.noConflict();
(function($) { 

  $(function() {
    
    $('<div id="farfalla_keyboard"></div>').appendTo('body');

    $.keyboard_on = function () {

      $('#keyboardActivator').farfalla_switch_on('keyboard');

      head.js(farfalla_path+'plugins/keyboard/virtualkeyboard/vk_loader.js?vk_layout=IT%20Italian&vk_skin=soberTouch', function(){
        $('textarea, input[type=text]').click(function(){
          VirtualKeyboard.attachInput(this);
          VirtualKeyboard.toggle($(this),'farfalla_keyboard');
          var position = $(this).position()
          var height = $(this).height()
          $('#farfalla_keyboard').css({
            'position' : 'absolute',
            'top' : position.top+height+10+'px',
            'left' : position.left
          })
        })
      });

    }

    $.keyboard_off = function () {
      $('#keyboardActivator').farfalla_switch_off('keyboard');
//      VirtualKeyboard.hide()
    } 

    $.keyboard_on()

    $('#keyboardActivator').click( function(){
      if($(this).hasClass('active')){
        $.keyboard_off()
      } else {
        $.keyboard_on()
      }
    });

  });

})(jQuery);
