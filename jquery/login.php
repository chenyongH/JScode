<?php
	require 'config.php';
	$_password = sha1($_POST['login_password']);
	$query = mysql_query("SELECT user ,password FROM user WHERE user = '{$_POST['login_user']}' AND password = '{$_password}'") or die('mySQL 错误！');
	if(mysql_fetch_array($query, MYSQL_ASSOC)){
		echo 'true';
	}else{
		echo 'false';
	}
	mysql_close();

?>