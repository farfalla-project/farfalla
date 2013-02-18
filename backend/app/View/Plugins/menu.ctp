<?php
Configure::write('debug', 0);

// UI localized strings
$choose = __('Choose your profile...', true);
$get = __('get preferences', true);
$logo = __('Click on the Farfalla logo to show or hide the toolbar', true);
$home = __('Go to <strong>Farfalla project</strong> website', true);
$handle = __('<strong>Drag the bar up and down from here</strong><br />The position will be remembered',true);

echo($_GET['callback'].'(');
echo('{"ui":');
echo('{"choose":"' . $choose . '","logo":"' . $logo . '","handle":"' . $handle . '","home":"' . $home . '"},');
echo('"plugins":');
echo($this->Js->object($plugins));
echo('});');

?>