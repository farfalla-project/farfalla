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


// New logic here

$f.##plugin_name##_on = function () {
  $f('###plugin_name##Activator').farfalla_switch_on('##plugin_name##');

 // New logic here

}

$f.##plugin_name##_off = function () {
  $f('###plugin_name##Activator').farfalla_switch_off('##plugin_name##');

// New logic here

}

$f.##plugin_name##_on()

$f('###plugin_name##Activator').click( function(){
  if($f(this).hasClass('active')){
	$f.##plugin_name##_off()
  } else {
	$f.##plugin_name##_on()
  }
});
