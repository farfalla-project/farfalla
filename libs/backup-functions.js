//
// Set the path to main Farfalla scripts from the cookie set at every page load
//

function getFarfallaPath(){
var search = 'farfalla_path=';
if (document.cookie.length > 0) {
	offset = document.cookie.indexOf(search);
	if (offset != -1) {
		offset += search.length;
		end = document.cookie.indexOf(";", offset);
		if (end == -1){
			end = document.cookie.length;
			}
			return unescape(document.cookie.substring(offset, end))
		}
	}
}
