<?php ?>


  <form id="farfalla_toolbar_form" action="#" method="post">
    <select id="farfalla_profile" name="farfalla_profile">

      <option class="choose"><?php __('Choose your profile...',false); ?></option>

    <?php
		$i = 0;
		foreach ($profiles as $profile):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
	?>
		<option value="<?php echo $profile['Profile']['id'] ?>"><?php echo $profile['Profile']['name']; ?></strong>&nbsp;</td>
		</option>

    <?php endforeach; ?>
    </select>
    
	<input type="submit" id="farfalla_activator" value="<?php __('get preferences',false); ?>" />

  </form>
  
