<?php

$this->layout = 'ajax';

?>

var strings = new Array(
 "ft_farfalla_project"
,"ft_accessibility_preferences"
,"ft_actions"
,"hicontrast"
,"fontsize"
,"clarifier"
,"magnifier"
,"keyboard"
,"bigcursor"
);

var translations = new Array(
<?php
  echo('"'. __('Farfalla project') .'"');
  echo(',"'. __('Accessibility Preferences') .'"');
  echo(',"'. __('Actions') .'"');
  echo(',"'. __('Contrast and color scheme control') .'"');
  echo(',"'. __('Font size control') .'"');
  echo(',"'. __('High readability') .'"');
  echo(',"'. __('Selective magnification') .'"');
  echo(',"'. __('Onscreen virtual keyboard') .'"');
  echo(',"'. __('Larger mouse cursor') .'"');
?>

);

