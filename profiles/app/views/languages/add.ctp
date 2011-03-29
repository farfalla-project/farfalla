<div class="languages form">
<?php echo $this->Form->create('Language');?>
	<fieldset>
 		<legend><?php __('Add Language'); ?></legend>
	<?php
		echo $this->Form->input('name');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Languages', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Alttexts', true), array('controller' => 'alttexts', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Alttext', true), array('controller' => 'alttexts', 'action' => 'add')); ?> </li>
	</ul>
</div>