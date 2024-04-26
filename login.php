<?php
$name = $_GET['username'];	//获取get方式传递的用户名
$pass = $_GET['password'];	//获取get方式传递的密码

//调用connect.php文件，解决中文乱码和链接数据库
include "./connect.php";

// 执行查询的sql语句，验证用户名和密码
$sql = "SELECT * FROM `userinfo` WHERE `username`='$name' AND `password`='$pass' ";
$res = mysqli_query($conn,$sql);

//解析查询结果，解析单行数据
$row = mysqli_fetch_assoc($res);	//没有查询结果里面没有符合条件的数据，单行解析结果是null

if($row){
	// 能查询到,跳转到购物车页面
	header('cart.html');
}else{
	// 没有查询到,跳转会登录页面
	header('login.html');
}

// 断开链接
mysqli_close($conn);
?>
