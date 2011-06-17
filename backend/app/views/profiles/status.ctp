<?php 

Configure::write('debug', 0);

echo($_GET['callback'].'(');
if($this -> Session -> read('id')){
	echo $this -> Session -> read('id');
} else {
	echo '0';
}; 
echo(');');

//var_dump($pippo);

?>