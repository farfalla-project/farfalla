<div class="plugins form">
<?php echo $this->Form->create('Plugin');?>
	<fieldset>
 		<legend><?php __('Edit Plugin'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('name');
		echo $this->Form->input('description');
		echo $this->Form->input('Profile');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Plugin.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Plugin.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Plugins', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Profiles', true), array('controller' => 'profiles', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Profile', true), array('controller' => 'profiles', 'action' => 'add')); ?> </li>
	</ul>
</div>