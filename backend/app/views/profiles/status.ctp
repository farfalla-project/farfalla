<?php

Configure::write('debug', 0);

echo($_GET['callback'].'(');
echo($javascript->object($this->Session->read()));
echo(');');
?>