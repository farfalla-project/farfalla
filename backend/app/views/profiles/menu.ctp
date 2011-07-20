<?php
Configure::write('debug', 0);
$choose = __('Choose your profile...', true);
$get = __('get preferences', true);
echo($_GET['callback'].'(');
echo('{"ui":');
echo('{"choose":"' . $choose . '","get":"' . $get . '"},');
echo('"profiles":');
echo($javascript->object($profiles));
echo('});');
?>