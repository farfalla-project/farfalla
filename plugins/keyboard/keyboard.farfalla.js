// Farfalla plugin: Virtual Keyboard

jQuery.noConflict();
(function($) { 

  $(function() {
    
    $.create_keyboard_wrapper = function (element) {
      $(element).wrap('<div id="farfalla_keyboard_wrapper"></div>');
    };

    $.create_keyboard = function () {
      $('<div id="farfalla_keyboard"></div>')
        .css({
          'position':'absolute',
          'display':'block',
          'top':0,
          'left':0,
          'z-index':10000000
        }).prependTo('body');
    }

    $.destroy_keyboard_wrapper = function () {
      $('#farfalla_keyboard').detach();
//      $('#farfalla_keyboard_wrapper *:first-child').unwrap();
    };

    $('<div id="farfalla_keyboard_shade" class="donttouchme"></div>')
      .css({
         'position':'absolute',
         'display':'block',
         'top':0,
         'left':0,
         'width':'100%',
         'height':'100%',
         'z-index':1000000
      }).hide().appendTo('body');

    $.keyboard_on = function () {


      $('#keyboardActivator').farfalla_switch_on('keyboard');

      head.js(farfalla_path+'plugins/keyboard/virtualkeyboard/vk_loader.js?vk_layout=IT%20Italian&vk_skin=farfalla', function(){
        $('textarea, input[type=text]').click(function(){
          $.create_keyboard_wrapper(this);
          $.create_keyboard();
          $('#farfalla_keyboard_shade').css('top',$(window).scrollTop()).show();
          VirtualKeyboard.attachInput(this);
          VirtualKeyboard.open($(this),'farfalla_keyboard');
          $('#farfalla_keyboard *').addClass('donttouchme');
        })
        $('#farfalla_keyboard_shade').click(function(){
          VirtualKeyboard.close();
          $.destroy_keyboard_wrapper();
          $(this).hide();
        })
      });

    }

    $.keyboard_off = function () {
      $('#keyboardActivator').farfalla_switch_off('keyboard');
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