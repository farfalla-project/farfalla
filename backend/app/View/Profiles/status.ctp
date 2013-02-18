<?php

Configure::write('debug', 0);

echo($_GET['callback'].'(');
echo($this->Js->object($this->Session->read()));
echo(');');
?>