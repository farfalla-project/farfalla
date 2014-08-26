/*!
 * Farfalla - Accessibility in the Cloud
 * http://farfalla-project.org/
 *
 *  Copyright (C) 2010  Andrea Mangiatordi
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Google analytics monitoring code

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-9777827-25', 'farfalla-project.org');
  ga('send', 'pageview');


jQuery.noConflict();
(function($) {

  $(function() {

    // Include htmlClean plugin
    head.js(farfalla_path +'libs/jquery.htmlClean-min.js');

    $.farfalla_add_css('magnifier','magnifier');

    jQuery.expr[':'].hasText = function(element, index) {
       // if there is only one child, and it is a text node
       if (element.childNodes.length == 1 && element.firstChild.nodeType == 3) {
          return jQuery.trim(element.innerHTML).length > 0;
       }
       return false;
    };

    // Quick fix for lists
    $('ul, ol').css('overflow','hidden');

    var mags;

    $.magnifier_on = function () {

      $('#magnifierActivator').farfalla_switch_on('magnifier');

      if (mags) {

        mags.prependTo('body');
        mags = null;

      } else {

        $('<div id="monitor"></div>')
          .html('<p style="font-size:30pt">Farfalla Magnification module: active</p>')
          .addClass('monitor ui-corner-all')
          .prependTo('body')
          .fadeIn(300);

       $('<div id="farfalla_link_selector"></div>')
          .hide()
          .prependTo('body');

       $('<div id="highlighter"></div>')
         .addClass('highlighter ui-corner-all donttouchme')
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
            $('#farfalla_link_selector').html('').hide();
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
              $('#farfalla_link_selector').html('').hide();
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

      $('#magnifierActivator').farfalla_switch_off('magnifier');
       mags = $('#monitor, #highlighter').detach();
       $('html').unbind('keydown');

    }

    $.magnifier_on()

    $('#magnifierActivator').click( function(){
      if($(this).hasClass('active')){
        $.magnifier_off()
      } else {
        $.magnifier_on()
      }
    });


  });

})(jQuery);
