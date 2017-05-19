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

// Farfalla plugin: Font Size

// Google analytics monitoring code
/*
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','_gaffontsize');

  _gaffontsize('create', 'UA-9777827-27', {'cookieName':'_gaffontsize'});
  _gaffontsize('set', 'anonymizeIp', true);
  _gaffontsize('send', 'pageview');
*/

    $f.farfalla_create_plugin_options('fontsize');

    $f.farfalla_change_size = function (val) {
      var value = 1+val*0.1;
      $f('#farfalla-fontsize-container').css({
        'zoom': value,
        '-moz-transform': 'scale('+value+')',
        '-moz-transform-origin': 'top left',
        'position':'absolute',
        'z-index':0
      });
      $f('#farfalla-fontsize-container').width($f('body').width()/value);
      $f.farfalla_set_option('increase',val);
    };

    $f.farfalla_reset_size = function () {
      $f('#farfalla-fontsize-container').css({
        'zoom': 1,
        '-moz-transform': 'scale(1)'
      });
      $f('#farfalla-fontsize-container').width($f('body').width());
      $f.farfalla_set_option('increase',0);
    };

    var increase = 0;

    // Increase Font Size
    $f.farfalla_add_ui('fontsize', 'button', 'fontsize_increase', 'plus', '+', 1, function(){

      increase+=1;
      var value= increase;
      $f.farfalla_change_size(value);
      return increase;
    });

    // Decrease Font Size
    $f.farfalla_add_ui('fontsize', 'button', 'fontsize_decrease', 'minus', '-', 1, function(){

      increase+=-1;
      var value= increase;
      $f.farfalla_change_size(value);
      return increase;
    });

    // Reset Font Size

    $f.farfalla_add_ui('fontsize', 'button', 'fontsize_reset', 'refresh', 'reset', 1, function(){

      $f.farfalla_reset_size();
      increase=0;
      return increase;

    });

    fontsize_on = function () {

      if($f('#farfalla-fontsize-container').length===0){
        $f('body > *').not('#farfalla_container, script').wrapAll('<div id="farfalla-fontsize-container" />');
      }

      $f('#fontsizeActivator').farfalla_switch_on('fontsize');

      var current_fontsize = $f.farfalla_get_option('increase');
      if (current_fontsize !== 'undefined' && current_fontsize !== 0){
          $f.farfalla_change_size(current_fontsize);
      }
      $f('#fontsize_options').attr('aria-hidden','false').show();

    };

    fontsize_off = function () {

      $f('#fontsize_options').attr('aria-hidden','true').hide();
      $f.farfalla_reset_size();
      $f('#fontsizeActivator').farfalla_switch_off('fontsize');

    };
/*
    $f('#fontsizeActivator').click( function(){
      if($f(this).hasClass('farfalla_active')){
        $f.fontsize_off();
      } else {
        $f.fontsize_on();
      }
    });
*/
    // $f.fontsize_on();

    if($f.inArray('fontsize',store.get('active_plugins'))>=0){
      fontsize_on();
      $f('.plugin_options').hide();
    }
