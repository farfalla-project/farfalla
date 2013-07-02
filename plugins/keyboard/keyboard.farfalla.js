// Farfalla plugin: Virtual Keyboard

jQuery.noConflict();
(function($) { 

  $(function() {

    $.create_keyboard = function () {
      $('<div id="farfalla_keyboard"></div>')
        .css({
          'position':'fixed',
          'display':'block',
          'bottom':0,
          'right':0,
          'left':0,
          'width':'608px',
          'margin':'auto',
          'z-index':10000000
        }).prependTo('body');
    }

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

      $.create_keyboard();

      $('#keyboardActivator').farfalla_switch_on('keyboard');

      head.js(farfalla_path+'plugins/keyboard/virtualkeyboard/vk_loader.js?vk_layout=IT%20Italian&vk_skin=farfalla', function(){
        $('textarea, input[type=text], input:not([type])').click(function(){
          $('#farfalla_keyboard_shade').css('top',$(window).scrollTop()).show();
          $(this).addClass('farfalla_keyboard_target');
          $('<textarea id="farfalla_keyboard_monitor" class="ui-corner-top"></textarea>')
            .val($('.farfalla_keyboard_target').val())
            .css({
              'background':'#eee',
              'color':'#000',
              'font-size':'16px',
              'line-height':'24px',
              'display':'block',
              'margin':0,
              'width':'608px',
              'border':'1px solid #666',
              'height': 'auto'
            })
            .prependTo('#farfalla_keyboard')
            .focusToEnd();
          VirtualKeyboard.open('farfalla_keyboard_monitor','farfalla_keyboard');
          VirtualKeyboard.attachInput('farfalla_keyboard_monitor');
          $('#farfalla_keyboard *').addClass('donttouchme');
          $('#farfalla_keyboard').click(function(){
            $('.farfalla_keyboard_target').val(($('#farfalla_keyboard_monitor').val()));
          });
        })
        $('#farfalla_keyboard_shade').click(function(){
          VirtualKeyboard.close();
          $('#farfalla_keyboard_monitor').remove();
          $('.farfalla_keyboard_target').removeClass('farfalla_keyboard_target');
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