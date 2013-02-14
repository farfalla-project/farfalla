<?php

Configure::write('debug', 0);

echo($_GET['callback'].'({"value":"');
echo($value);
echo('"});');

?>﻿