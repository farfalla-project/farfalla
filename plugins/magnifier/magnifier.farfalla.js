jQuery.noConflict();
(function($) { 

  $(function() {

    // Include htmlClean plugin
    $.getScript(farfalla_path +'libs/jquery.htmlClean-min.js');

    jQuery.expr[':'].hasText = function(element, index) {
       // if there is only one child, and it is a text node
       if (element.childNodes.length == 1 && element.firstChild.nodeType == 3) {
          return jQuery.trim(element.innerHTML).length > 0;
       }
       return false;
    };

    // Quick fix for lists
    $('ul').css('overflow','hidden');

    var mags;

    $.magnifier_on = function () {

//      $('<div id="farfalla_debug"></div>').appendTo('body');


      if (mags) {

        mags.prependTo('body');
        mags = null;

      } else {

        $('<div id="monitor">')
          .html('<p style="font-size:30pt">Farfalla Magnification module: active</p>')
          .addClass('monitor')
          .addClass('ui-corner-all')
          .prependTo('body')
          .fadeIn(300);

       $('<div id="highlighter">')
         .addClass('highlighter')
         .addClass('ui-corner-all')
         .prependTo('body');

      }

      $('#highlighter').click(
        function() {
          $('.farfalla-hover').trigger('click')
        }
      );

      $(window).scroll(function(){
        if($('#monitor').height()<$(window).height()){
          $('#monitor')
            .css('margin-top', ($(window).scrollTop()) + 'px');
        }
      });

      $('#monitor').mouseover(
        function(){ $(this).toggleClass('monitor_left') }
      );

      $('#monitor div').removeClass('*');

      // Highlight elements...
      $('h1, h2, h3, h4, h5, p, ul, ol, input, textarea, th:hasText, td:last-child, td:hasText, pre, label, dt, dd, div:hasText, address').each(function() {
        $(this).hover(
          function() {
            $('.farfalla-hover').removeClass('farfalla-hover');
            $(this).addClass('farfalla-hover');
            var offset = $(this).offset();
            $('#highlighter').animate({
              'height' : $(this).height() + 10, 'left' : (offset.left - 6) + 'px', 'top' : (offset.top - 10) + 'px', 'width' : $(this).width() + 12 
            }, 300);
            $('#monitor')
              .html($.htmlClean($(this).html(), { allowedTags : ['a', 'ul', 'ol', 'li', 'br', 'p'] })+$(this).val())
              .css({'margin-top' : ($(window).scrollTop()) + 'px', 'font-size' : '30pt' });

            $('#monitor *').css({'font-size': 'inherit', 'line-height': 'inherit'});

            $('#monitor a').each( function(i){
              $(this).append('<span style="color:violet;"> ['+ (i+1) +']</span>');   
            });

          },
          function() {
//          $(this).removeClass('farfalla_red');
            // kept this, just in case...
          })
        });


      // Changes the page href according to a number indicating an <a> in the currently magnified area

      function goToHref (value) {
        document.location.href = $('#monitor a').eq(value-1).attr('href');
      };

      // Allows control over multi-key pressures for selecting an <a>
      function filterKeys (length, value) {
        if(length > 0 && value <= length) {
          if (length < 10) {
            goToHref(value);
          } else  {
            $('#farfalla_link_selector').show().append(value);
            if ($('#farfalla_link_selector').html()>length) {
              $('#farfalla_link_selector').html('');
            }
          }
        }
      }


      $('html').keydown(function(event) {

        var requestedAction = null;

        switch (event.keyCode){

          /*up*/          case 38 : $('#monitor').animate({'marginTop': '+=50px'}, 'fast' ); return false; break;
          /*down*/        case 40 : $('#monitor').animate({'marginTop': '-=50px' }, 'fast' ); return false; break;
          /*right*/       case 39 : $('#monitor').animate({'marginLeft': '50%' }, 'fast' ); return false; break;
          /*left*/        case 37 : $('#monitor').animate({'marginLeft': '0' }, 'fast' ); return false; break;
          /* + */         case 107 : $('div.monitor').animate({'fontSize': '+=10pt' }, 'fast' ); return false; break;
          /* + chrome */  case 187 : $('div.monitor').animate({'fontSize': '+=10pt' }, 'fast' ); return false; break;

          /* . */         case 190 : $('#monitor').css('width', '45%').animate({'marginLeft': '50%' }, 'fast' ); return false; break;
          /* , */         case 188 : $('#monitor, #highlighter').toggleClass('hidden'); return false; break;

          /* - */         case 109 : $('div.monitor').animate({'fontSize': '-=10pt' }, 'fast' ); return false; break;
          /* - chrome */  case 189 : $('div.monitor').animate({'fontSize': '-=10pt' }, 'fast' ); return false; break;

          /* 1 */     case 49 : filterKeys($('#monitor a').length, 1); return false; break;
          /* 2 */     case 50 : filterKeys($('#monitor a').length, 2); return false; break;
          /* 3 */     case 51 : filterKeys($('#monitor a').length, 3); return false; break;
          /* 4 */     case 52 : filterKeys($('#monitor a').length, 4); return false; break;
          /* 5 */     case 53 : filterKeys($('#monitor a').length, 5); return false; break;
          /* 6 */     case 54 : filterKeys($('#monitor a').length, 6); return false; break;
          /* 7 */     case 55 : filterKeys($('#monitor a').length, 7); return false; break;
          /* 8 */     case 56 : filterKeys($('#monitor a').length, 8); return false; break;
          /* 9 */     case 57 : filterKeys($('#monitor a').length, 9); return false; break;
          /* 0 */     case 48 : filterKeys($('#monitor a').length, 0); return false; break;

          /* backspace */  case 8 : $('#farfalla_link_selector').html('').hide(); return false; break;
          /* enter */      case 13 : goToHref($('#farfalla_link_selector').html()); return false; break;

          default:requestedAction='null';
        }
  
      });

    }
    
    $.magnifier_off = function () {

       mags = $('#monitor, #highlighter').detach();
       $('html').unbind('keydown');

    }

    $.magnifier_on()

    $('#magnifierActivator').click( function(){
      if($(this).attr('checked')=='checked'){
        $.magnifier_on()
      } else {
        $.magnifier_off()
      }
    });


  });

})(jQuery);
