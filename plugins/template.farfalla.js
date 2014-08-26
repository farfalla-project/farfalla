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

// Farfalla plugin: ##plugin_name##
// This is a template for new plugins. Replace ##plugin_name## with the exact name of a new plugin to start creating yours.


jQuery.noConflict();
(function($) {

  $(function() {

    // New logic here

    $.##plugin_name##_on = function () {
      $('###plugin_name##Activator').farfalla_switch_on('##plugin_name##');

     // New logic here

    }

    $.##plugin_name##_off = function () {
      $('###plugin_name##Activator').farfalla_switch_off('##plugin_name##');

    // New logic here

    }

    $.##plugin_name##_on()

    $('###plugin_name##Activator').click( function(){
      if($(this).hasClass('active')){
        $.##plugin_name##_off()
      } else {
        $.##plugin_name##_on()
      }
    });

  });

})(jQuery);
