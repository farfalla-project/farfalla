<?php

$this->layout = 'ajax';

$language = substr(Configure::read('Config.language'),0,2);

$known_languages = array(
  "en"
  ,"it"
  ,"es"
);

if(in_array($language, $known_languages)){
  $lang_code = $language;
} else {
  $lang_code = "en";
}

?>

var detected_language = <?php echo ('"'. $lang_code .'";'); ?>

var strings = new Array(
"ft_farfalla_project"
,"ft_accessibility"
,"ft_accessibility_preferences"
,"ft_actions"
,"ft_url_title"
,"ft_url_title_jm2"
,"save_session"
,"reset"
,"hicontrast"
,"fontsize"
,"clarifier"
,"magnifier"
,"keyboard"
,"bigcursor"
,"Color_schemes"
,"Actions"
);

var translations = new Array(
<?php
  echo('"'. __('Farfalla project') .'"');
  echo(',"'. __('Accessibility') .'"');
  echo(',"'. __('Accessibility Preferences') .'"');
  echo(',"'. __('Actions') .'"');
  echo(',"'. __('Jump to the Farfalla project website') .'"');
  echo(',"'. __('Jump to the web accessibility page') .'"');
  echo(',"'. __('Save current settings for the future') .'"');
  echo(',"'. __('Reset all settings') .'"');
  echo(',"'. __('Contrast and color scheme control') .'"');
  echo(',"'. __('Font size control') .'"');
  echo(',"'. __('High readability') .'"');
  echo(',"'. __('Selective magnification') .'"');
  echo(',"'. __('Onscreen virtual keyboard') .'"');
  echo(',"'. __('Larger mouse cursor') .'"');
  echo(',"'. __('Color schemes') .'"');
  echo(',"'. __('Actions') .'"');
?>

);

