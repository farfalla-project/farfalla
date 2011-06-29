<?php ?>
<div class="profiles form">
<?php echo $this->Form->create('Profile');?>
	<fieldset>
 		<legend><?php __('Copy Profile'); ?></legend>
	<?php
		echo $this->Form->input('name', array('label'=>__('Choose a new name for your version of this profile. Remember this one was originally called <strong>', true) . $this->data['Profile']['name'] . '</strong>', 'value'=>''));
//		echo $this->Form->input('password');
		echo $this->Form->input('description', array('label'=>__('This is a description for your profile. It could be useful for other people wishing to use it.', true)));
		echo $this->Form->input('Plugin', array('label'=>__('These are the plugins available for inclusion in your profile.', true),'multiple' => 'checkbox'));
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Profile.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Profile.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Profiles', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Plugins', true), array('controller' => 'plugins', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Plugin', true), array('controller' => 'plugins', 'action' => 'add')); ?> </li>
	</ul>
</div>