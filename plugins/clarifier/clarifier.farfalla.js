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
  })(window,document,'script','//www.google-analytics.com/analytics.js','_gafclarifier');

  _gafclarifier('create', 'UA-9777827-28', {'cookieName':'_gafclarifier'});
  _gafclarifier('send', 'pageview');


$f = jQuery.noConflict(true);

/*
      $f('html').each( function(){
        console.log($f(this).css('background-color'));
      })
*/
      $f.farfalla_add_css('clarifier','clarifier');

      $f.clarifier_on = function () {

        $f('#clarifierActivator').farfalla_switch_on('clarifier');

        $f('#farfalla_container *').addClass('donttouchme');

        // Set <html> background color to cream, but only in case it is white
        if($f('html').css('background-color')=='transparent'||$f('html').css('background-color')=='rgba(0, 0, 0, 0)'){
          $f('html').addClass('creamBackground');
        }

        $f('*').not('.donttouchme').each(function(){

          if($f(this).css('background-color')=='rgb(255, 255, 255)'){
            $f(this).addClass('creamBackground');
          }

        });

        $f('input, textarea').not('.donttouchme').addClass('inputClarifier');

        // Set fonts to Tahoma, Arial, sans

        $f('*').not('.donttouchme').addClass('fontClarifier');

        $f('h1').not('.donttouchme').addClass('h1Clarifier');

        $f('h2').not('.donttouchme').addClass('h2Clarifier');

        $f('h1, h2, h3, h4, h5, h6, h7, h8, h9, h10').not('.donttouchme').addClass('boldClarifier');

        $f('*').not('.donttouchme').each(function(){

          if($f(this).css('text-align')=='justify'){
            $f(this).addClass('leftAlignClarifier');
          }

        });

        // Set line height to 200% in <p> and <li> elements only

        $f('p, li').not('.donttouchme').each(function(){
          $f(this).addClass('linespacingClarifier');
        });

      }

      $f.clarifier_off = function () {

        $f('#clarifierActivator').farfalla_switch_off('clarifier');
        $f('*').removeClass('creamBackground');
        $f('input, textarea').removeClass('inputClarifier');
        $f('*').removeClass('fontClarifier');
        $f('h1').removeClass('h1Clarifier');
        $f('h2').removeClass('h2Clarifier');
        $f('h1, h2, h3, h4, h5, h6, h7, h8, h9, h10').removeClass('boldClarifier');
        $f('*').removeClass('leftAlignClarifier');
        $f('p, li').removeClass('linespacingClarifier');

      }

    $f('#clarifier_options_switch').click( function(){
      if($f(this).hasClass('plugin_options_switch_on')){
        $f.clarifier_off()
      } else {
        $f.clarifier_on()
      }
    });

    $f.clarifier_on();


  });