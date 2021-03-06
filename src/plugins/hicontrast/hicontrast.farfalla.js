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

// Farfalla plugin: hicontrast
// This plugin allows to change the background and foreground color on pages.

// Google analytics monitoring code
/*
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','_gafhicontrast');


  _gafhicontrast('create', 'UA-9777827-26', {'cookieName':'_gafhicontrast'});
  _gafhicontrast('set', 'anonymizeIp', true);
  _gafhicontrast('send', 'pageview');
*/

    $f.farfalla_create_plugin_options('hicontrast');

    $f('*').each(function(){
      if($f(this).css('background-color')=="transparent"){
        $f(this).addClass('farfalla-transparent-bg');
      }
    });

    var colorSchemes = new Array("black_white","black_green","black_lightblue","black_yellow","blue_white","blue_yellow","cyan_black","lightblue_black","lightyellow_black","white_black","yellow_black");

    $f.each(colorSchemes, function(index, value){
      $f.farfalla_add_ui('hicontrast', 'button', 'hicontrast_'+value, 'adjust', index, value, function(){

        $f('.farfalla_selected_plugin_option').removeClass('farfalla_selected_plugin_option');
        $f.farfalla_remove_plugin_css('hicontrast');
        $f.farfalla_add_css('hicontrast','hicontrast_'+value);
        $f.farfalla_set_option('colorscheme',value);
        $f(this).addClass('farfalla_selected_plugin_option');

      });
    });

    $f.farfalla_add_ui('hicontrast', 'button', 'hicontrast_reset', 'refresh', 'reset', 1, function(){

      $f.farfalla_remove_plugin_css('hicontrast');
      $f('.farfalla_selected_plugin_option').removeClass('farfalla_selected_plugin_option');
      $f.farfalla_set_option('colorscheme');

    });

    hicontrast_on = function () {

      $f('#farfalla_container *').addClass('donttouchme');
      $f('#hicontrastActivator').farfalla_switch_on('hicontrast');
      $f('#hicontrast_options').slideDown('fast');
      var active_colorscheme = $f.farfalla_get_option('colorscheme');
      if (active_colorscheme!=='undefined'){
          $f('#hicontrast_'+active_colorscheme+'_button').click();
      }
    };

    hicontrast_off = function () {

      $f('#hicontrastActivator').farfalla_switch_off('hicontrast');
      $f('#hicontrast_options').hide();
      $f.farfalla_remove_plugin_css('hicontrast');
      $f('.farfalla_selected_plugin_option').removeClass('farfalla_selected_plugin_option');
      $f.farfalla_set_option('colorscheme');

    };
/*
    if($f.inArray('hicontrast',store('active_plugins'))>=0){
      hicontrast_on();
      $f('.plugin_options').hide();
    }
*/
