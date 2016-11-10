// Farfalla plugin: Virtual Keyboard

// Google analytics monitoring code

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','_gafkeyboard');

  _gafkeyboard('create', 'UA-9777827-24', {'cookieName':'_gafkeyboard'});
  _gafkeyboard('set', 'anonymizeIp', true);
  _gafkeyboard('send', 'pageview');


    $f.create_keyboard = function () {
      $f('<div id="farfalla_keyboard"></div>')
        .css({
          'position':'fixed',
          '_position':'absolute',
          'display':'block',
          'bottom':0,
          'right':0,
          'left':0,
          'width':'608px',
          'margin':'auto',
          'z-index':100000
        }).prependTo('body');
    }

    $f.destroy_keyboard = function () {
      $f('#farfalla_keyboard').remove();
    }

    $f('<div id="farfalla_keyboard_shade" class="donttouchme"></div>')
      .css({
         'position':'absolute',
         'display':'block',
         'top':0,
         'left':0,
         'width':'100%',
         'height':'100%',
         'z-index':99999
      }).hide().appendTo('body');

    $f.keyboard_on = function () {

      $f.create_keyboard();

      $f('#keyboardActivator').farfalla_switch_on('keyboard');

      head.load(farfalla_path+'src/plugins/keyboard/virtualkeyboard/vk_loader.js?vk_layout=IT%20Italian&vk_skin=farfalla', function(){
        $f('textarea, input[type=text], input[type=password], input[type=email], input[type=search], input:not([type])').click(function(){
          $f('#farfalla_keyboard_shade').css('top',$f(window).scrollTop()).show();
          $f(this).addClass('farfalla_keyboard_target');

          if($f('#farfalla_keyboard_monitor').length != 1){
            $f('<textarea id="farfalla_keyboard_monitor" class="ui-corner-top"></textarea>')
              .val($f('.farfalla_keyboard_target').val())
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
          }
          VirtualKeyboard.open('farfalla_keyboard_monitor','farfalla_keyboard');
          VirtualKeyboard.attachInput('farfalla_keyboard_monitor');
          $f('#farfalla_keyboard *').addClass('donttouchme');
          $f('#farfalla_keyboard').click(function(){
            $f('.farfalla_keyboard_target').val(($f('#farfalla_keyboard_monitor').val()));
          });
        })
        $f('#farfalla_keyboard_shade').click(function(){
          VirtualKeyboard.close();
          $f('#farfalla_keyboard_monitor').remove();
          $f('.farfalla_keyboard_target').removeClass('farfalla_keyboard_target');
          $f(this).hide();
        })
      });

    }

    $f.keyboard_off = function () {
      $f('#keyboardActivator').farfalla_switch_off('keyboard');
      $f.destroy_keyboard();
    }

//    $f.keyboard_on()

    $f('#keyboardActivator').click( function(){
      if($f(this).hasClass('farfalla_active')){
        $f.keyboard_off()
      } else {
        $f.keyboard_on()
      }
    });
