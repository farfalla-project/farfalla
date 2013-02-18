<div class="plugins view">
<h2><?php  echo __('Plugin'); ?></h2>
	<dl>
		<dt><?php echo __('Id'); ?></dt>
		<dd>
			<?php echo h($plugin['Plugin']['id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Name'); ?></dt>
		<dd>
			<?php echo h($plugin['Plugin']['name']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Description'); ?></dt>
		<dd>
			<?php echo h($plugin['Plugin']['description']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Group'); ?></dt>
		<dd>
			<?php echo $this->Html->link($plugin['Group']['name'], array('controller' => 'groups', 'action' => 'view', $plugin['Group']['id'])); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Visible'); ?></dt>
		<dd>
			<?php echo h($plugin['Plugin']['visible']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Created'); ?></dt>
		<dd>
			<?php echo h($plugin['Plugin']['created']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Modified'); ?></dt>
		<dd>
			<?php echo h($plugin['Plugin']['modified']); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Plugin'), array('action' => 'edit', $plugin['Plugin']['id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete Plugin'), array('action' => 'delete', $plugin['Plugin']['id']), null, __('Are you sure you want to delete # %s?', $plugin['Plugin']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Plugins'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Plugin'), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Groups'), array('controller' => 'groups', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Group'), array('controller' => 'groups', 'action' => 'add')); ?> </li>
	</ul>
</div>
