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

// Farfalla plugin: Clarifier. Transforms the typography of a document in a Dyslexia-friendly fashion.

// Google analytics monitoring code

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-9777827-28', 'farfalla-project.org');
  ga('send', 'pageview');



jQuery.noConflict();
  (function($) {

    $(function() {

/*
      $('html').each( function(){
        console.log($(this).css('background-color'));
      })
*/
      $.farfalla_add_css('clarifier','clarifier');

      $.clarifier_on = function () {

        $('#clarifierActivator').farfalla_switch_on('clarifier');

        $('#farfalla_container *').addClass('donttouchme');

        // Set <html> background color to cream, but only in case it is white
        if($('html').css('background-color')=='transparent'||$('html').css('background-color')=='rgba(0, 0, 0, 0)'){
          $('html').addClass('creamBackground');
        }

        $('*').not('.donttouchme').each(function(){

          if($(this).css('background-color')=='rgb(255, 255, 255)'){
            $(this).addClass('creamBackground');
          }

        });

        $('input, textarea').addClass('inputClarifier');

        // Set fonts to Tahoma, Arial, sans

        $('*').not('.donttouchme').addClass('fontClarifier');

        $('h1').not('.donttouchme').addClass('h1Clarifier');

        $('h2').not('.donttouchme').addClass('h2Clarifier');

        $('h1, h2, h3, h4, h5, h6, h7, h8, h9, h10').not('.donttouchme').addClass('boldClarifier');

        $('*').not('.donttouchme').each(function(){

          if($(this).css('text-align')=='justify'){
            $(this).addClass('leftAlignClarifier');
          }

        });

        // Set line height to 200% in <p> and <li> elements only

        $('p, li').not('.donttouchme').each(function(){
          $(this).addClass('linespacingClarifier');
        });

      }

      $.clarifier_off = function () {

        $('#clarifierActivator').farfalla_switch_off('clarifier');
        $('*').removeClass('creamBackground');
        $('input, textarea').removeClass('inputClarifier');
        $('*').removeClass('fontClarifier');
        $('h1').removeClass('h1Clarifier');
        $('h2').removeClass('h2Clarifier');
        $('h1, h2, h3, h4, h5, h6, h7, h8, h9, h10').removeClass('boldClarifier');
        $('*').removeClass('leftAlignClarifier');
        $('p, li').removeClass('linespacingClarifier');

      }


    $.clarifier_on()

    $('#clarifierActivator').click( function(){
      if($(this).hasClass('active')){
        $.clarifier_off()
      } else {
        $.clarifier_on()
      }
    });


  });

})(jQuery);