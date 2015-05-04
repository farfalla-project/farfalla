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

// Farfalla plugin: Big Cursor. Changes the default mouse cursor to an enlarged one with high contrast.
// To do: adding options for distinct cursors.

// Google analytics monitoring code

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','_gafbigcursor');

  _gafbigcursor('create', 'UA-9777827-29', {'cookieName':'_gafbigcursor'});
  _gafbigcursor('send', 'pageview');


    $f('<link></link>').attr({
      "rel":"stylesheet",
      "type":"text/css",
      "href":farfalla_path+"/plugins/bigcursor/bigcursor.farfalla.css"
    }).appendTo($f('head'));

    $f.bigcursor_on = function () {
      $f('#bigcursorActivator').farfalla_switch_on('bigcursor');
      $f('body').addClass('farfalla_bigcursor_arrow');
      $f('a, input').addClass('farfalla_bigcursor_pointer');
    };

    $f.bigcursor_off = function () {
      $f('#bigcursorActivator').farfalla_switch_off('bigcursor')
      $f('body').removeClass('farfalla_bigcursor_arrow');
      $f('a, input').removeClass('farfalla_bigcursor_pointer');
    };

    $f('#bigcursor_options_switch').click( function(){
      if($f(this).hasClass('plugin_options_switch_on')){
        $f.bigcursor_off()
      } else {
        $f.bigcursor_on()
      }
    });

    $f.bigcursor_on();
