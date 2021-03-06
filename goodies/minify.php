<?php
// Run this using php-cli, or uglifyjs could not work
// Requires uglifyjs from https://github.com/mishoo/UglifyJS

date_default_timezone_set('Europe/Rome');
$date = date('l jS \of F Y h:i:s A');

echo $date . "\n\n";

exec('cat goodies/min.header.txt libs/jquery.min.js libs/jquery-migrate-1.2.1.js libs/jquery-ui.custom.min.js libs/jquery.qtip.min.js libs/noconflict.js libs/jquery.cookie.min.js libs/detectmobilebrowser.js libs/main.js > libs/farfalla.libs.js');
exec('uglifyjs libs/farfalla.libs.js > libs/farfalla.libs.min.js');

echo "JS libs minified...\n\n";

exec('cat css/jquery-ui.custom.min.css css/jquery.qtip.min.css css/webfont.css css/farfalla.css > css/farfalla.min.css');

echo "All required libs and CSS have just been merged into single files!\n\n";

$fdate = date('l jS \of F Y h:i:s A');

echo "Finished on " . $fdate . "\n";
?>
