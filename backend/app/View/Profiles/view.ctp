<div class="profiles view">
<h2><?php  echo __('Profile'); ?></h2>
	<dl>
		<dt><?php echo __('Id'); ?></dt>
		<dd>
			<?php echo h($profile['Profile']['id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Name'); ?></dt>
		<dd>
			<?php echo h($profile['Profile']['name']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Password'); ?></dt>
		<dd>
			<?php echo h($profile['Profile']['password']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Description'); ?></dt>
		<dd>
			<?php echo h($profile['Profile']['description']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Created'); ?></dt>
		<dd>
			<?php echo h($profile['Profile']['created']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Modified'); ?></dt>
		<dd>
			<?php echo h($profile['Profile']['modified']); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Profile'), array('action' => 'edit', $profile['Profile']['id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete Profile'), array('action' => 'delete', $profile['Profile']['id']), null, __('Are you sure you want to delete # %s?', $profile['Profile']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Profiles'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Profile'), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Plugins'), array('controller' => 'plugins', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Plugin'), array('controller' => 'plugins', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php echo __('Related Plugins'); ?></h3>
	<?php if (!empty($profile['Plugin'])): ?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php echo __('Id'); ?></th>
		<th><?php echo __('Name'); ?></th>
		<th><?php echo __('Description'); ?></th>
		<th><?php echo __('Group Id'); ?></th>
		<th><?php echo __('Visible'); ?></th>
		<th><?php echo __('Created'); ?></th>
		<th><?php echo __('Modified'); ?></th>
		<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($profile['Plugin'] as $plugin): ?>
		<tr>
			<td><?php echo $plugin['id']; ?></td>
			<td><?php echo $plugin['name']; ?></td>
			<td><?php echo $plugin['description']; ?></td>
			<td><?php echo $plugin['group_id']; ?></td>
			<td><?php echo $plugin['visible']; ?></td>
			<td><?php echo $plugin['created']; ?></td>
			<td><?php echo $plugin['modified']; ?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View'), array('controller' => 'plugins', 'action' => 'view', $plugin['id'])); ?>
				<?php echo $this->Html->link(__('Edit'), array('controller' => 'plugins', 'action' => 'edit', $plugin['id'])); ?>
				<?php echo $this->Form->postLink(__('Delete'), array('controller' => 'plugins', 'action' => 'delete', $plugin['id']), null, __('Are you sure you want to delete # %s?', $plugin['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Plugin'), array('controller' => 'plugins', 'action' => 'add')); ?> </li>
		</ul>
	</div>
</div>
