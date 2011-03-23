<?php ?>

<div class="profiles form">
<?php echo $this->Form->create('Profile');?>
	<fieldset>
 		<legend><?php __('Add Profile'); ?></legend>
			
	<p>This page allows you to create a custom profile from scratch. You can also clone <?php echo $this->Html->link(__('one of the existing profiles', true), array('action' => 'index')); ?> and edit it, adding or removing plugins.</p>

	<h3>Step 1.</h3>
	<?php
		echo $this->Form->input('name', array('label'=>__('Choose a name for your profile: it could be your own name, or a description of what it is useful for.', true)));
	?>
	<h3>Step 2.</h3>
	<?php
		echo $this->Form->input('password', array('label'=>__('Choose a password: this will be required for editing your profile.', true)));
	?>
	<h3>Step 3.</h3>
	<?php
		echo $this->Form->input('description', array('label'=>__('Enter a description for your profile. It could be useful for other people wishing to use it. Don\'t worry, you will never enter your personal data in your profile.', true)));
	?>
	<h3>Step 4.</h3>
	<?php
		echo $this->Form->input('Plugin', array('label'=>__('Now select the plugins you wish to include in your profile.', true),'multiple' => 'checkbox'));
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Profiles', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Plugins', true), array('controller' => 'plugins', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Plugin', true), array('controller' => 'plugins', 'action' => 'add')); ?> </li>
	</ul>
</div>