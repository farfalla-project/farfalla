<?php
// Run this using php-cli, or uglifyjs could not work
// Requires uglifyjs from https://github.com/mishoo/UglifyJS

exec('cat min.header.txt ../libs/jquery.min.js ../libs/jquery-ui.custom.min.js ../libs/jquery.qtip.min.js ../libs/jquery.cookie.min.js ../libs/main.js > ../libs/farfalla.libs.js');
exec('uglifyjs ../libs/farfalla.libs.js > ../libs/farfalla.libs.min.js');
echo "JS libs minified...\n\n";

exec('cat ../css/jquery-ui.custom.min.css ../css/jquery.qtip.min.css ../css/farfalla.css > ../css/farfalla.min.css');

echo "All required libs and CSS have just been merged into single files!\n";

?>