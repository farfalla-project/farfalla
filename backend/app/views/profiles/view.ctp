<div class="profiles view">
<h2><?php  __('Profile');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $profile['Profile']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Name'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $profile['Profile']['name']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Password'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $profile['Profile']['password']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $profile['Profile']['description']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Created'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $profile['Profile']['created']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Modified'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $profile['Profile']['modified']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Profile', true), array('action' => 'edit', $profile['Profile']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Profile', true), array('action' => 'delete', $profile['Profile']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $profile['Profile']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Profiles', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Profile', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Plugins', true), array('controller' => 'plugins', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Plugin', true), array('controller' => 'plugins', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Plugins');?></h3>
	<?php if (!empty($profile['Plugin'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Name'); ?></th>
		<th><?php __('Description'); ?></th>
		<th><?php __('Created'); ?></th>
		<th><?php __('Modified'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($profile['Plugin'] as $plugin):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $plugin['id'];?></td>
			<td><?php echo $plugin['name'];?></td>
			<td><?php echo $plugin['description'];?></td>
			<td><?php echo $plugin['created'];?></td>
			<td><?php echo $plugin['modified'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'plugins', 'action' => 'view', $plugin['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'plugins', 'action' => 'edit', $plugin['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'plugins', 'action' => 'delete', $plugin['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $plugin['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Plugin', true), array('controller' => 'plugins', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
