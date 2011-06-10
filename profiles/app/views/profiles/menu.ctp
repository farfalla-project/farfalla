<?php
Configure::write('debug', 0);
echo($_GET['callback'].'(');
// echo($javascript->object($farfalla_action));
echo($javascript->object($profiles));
echo(');');
?>