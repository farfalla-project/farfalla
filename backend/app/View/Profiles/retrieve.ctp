<?php
Configure::write('debug', 0);
$reset = __('change profile', true);
echo($_GET['callback'].'(');
echo('{"ui":');
echo('{"reset":"' . $reset . '"},');
echo('"description":');
echo($this->Js->object($profile));
echo('});');
?>