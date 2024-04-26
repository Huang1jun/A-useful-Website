<?php
// 定义几次数据库信息
$host = '127.0.0.1'; 	//本机IP地址
$username = 'root'; 	//数据库用户名
$password = 'root';		//数据库密码
$db = 'student';		//需要操作的库名
//处理中文乱码
header('content-type:text/html; charset=utf-8;');
//建立数据库链接
$conn = mysqli_connect($host,$username,$password,$db);
?>
