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
/*
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','_gafbigcursor');

  _gafbigcursor('create', 'UA-9777827-29', {'cookieName':'_gafbigcursor'});
  _gafbigcursor('set', 'anonymizeIp', true);
  _gafbigcursor('send', 'pageview');
*/

    $f('<link></link>').attr({
      "rel":"stylesheet",
      "type":"text/css",
      "href":farfalla_path+"src/plugins/bigcursor/bigcursor.farfalla.css"
    }).appendTo($f('head'));

    bigcursor_on = function () {
      $f('#bigcursorActivator').farfalla_switch_on('bigcursor');
      $f('body').addClass('farfalla_bigcursor_arrow');
      $f('a, input[type=button], input[type=submit], .plugin_activator, .plugin_options input').addClass('farfalla_bigcursor_pointer');
      $f('input, textarea').addClass('farfalla_bigcursor_text');

    };

    bigcursor_off = function () {
      $f('#bigcursorActivator').farfalla_switch_off('bigcursor');
      $f('body').removeClass('farfalla_bigcursor_arrow');
      $f('.farfalla_bigcursor_pointer').removeClass('farfalla_bigcursor_pointer');
      $f('.farfalla_bigcursor_text').removeClass('farfalla_bigcursor_text');
    };
/*
    $f('#bigcursorActivator').click( function(){
      if($f(this).hasClass('farfalla_active')){
        $f.bigcursor_off();
      } else {
        $f.bigcursor_on();
      }
    });
*/
//    $f.bigcursor_on();
/*
  if($f.inArray('bigcursor',fstore.find('active_plugins'))>=0){
    bigcursor_on();
    $f('.plugin_options').hide();
  }
*/
