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

$f.farfalla_create_plugin_options('##plugin_name##');

// New logic here

$f.##plugin_name##_on = function () {
  $f('###plugin_name##Activator').farfalla_switch_on('##plugin_name##');
  $f('.plugin_options').not('###plugin_name##').slideUp('fast');
  $f('###plugin_name##_options').slideDown('fast');

// New logic here

}

$f.##plugin_name##_off = function () {
  $f('###plugin_name##Activator').farfalla_switch_off('##plugin_name##');
  $f('###plugin_name##_options').hide();

// New logic here

}

$f.##plugin_name##_on();

$f('###plugin_name##_options_deactivate').click( function() {

  $f.##plugin_name##_off();

});

$f('###plugin_name##Activator').click( function(){

  $f.##plugin_name##_on()

});