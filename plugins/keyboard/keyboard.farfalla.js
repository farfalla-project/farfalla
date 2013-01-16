// Farfalla plugin: Virtual Keyboard

jQuery.noConflict();
(function($) { 

  $(function() {
    
    $('<div id="farfalla_keyboard"></div>').appendTo('body');
    $('<div id="farfalla_keyboard_shade"></div>')
      .css({
         'position':'absolute',
         'display':'block',
         'top':0,
         'left':0,
         'width':'100%',
         'height':'100%'
      }).hide().appendTo('body');

    $.keyboard_on = function () {

      $('#keyboardActivator').farfalla_switch_on('keyboard');

      head.js(farfalla_path+'plugins/keyboard/virtualkeyboard/vk_loader.js?vk_layout=IT%20Italian&vk_skin=soberTouch', function(){
        $('textarea, input[type=text]').click(function(){
          $('#farfalla_keyboard_shade').css('top',$(window).scrollTop()).show();
          VirtualKeyboard.attachInput(this);
          VirtualKeyboard.open($(this),'farfalla_keyboard');
          var position = $(this).position()
          var height = $(this).height()
          $('#farfalla_keyboard').css({
            'position' : 'absolute',
            'top' : position.top+height+10+'px',
            'left' : position.left
          })
        })
        $(window).scroll(function(){
          $('#farfalla_keyboard_shade').css('top',$(window).scrollTop());
        });
        $('#farfalla_keyboard_shade').click(function(){
          VirtualKeyboard.close();
          $(this).hide();
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
