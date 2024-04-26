<?php
    //获取前端POST方式传递的用户信息
    $un = $_POST['username'];//用户名
    $pw = $_POST['password'];//密码

    //解决中文乱码和链接数据库
    include "./connect.php";

    //执行插入的sql语句
    $sql = "INSERT INTO `userinfo` VALUES (null,'$un','$pw')";
    $res = mysqli_query($conn,$sql);

    //插入结果是布尔值，不需要解析
    var_dump($res);	//验证$res的值
    if($res){
        // 如果$res是true，说明插入成功，跳转登录页面
        header('login.html');
    }else{
        // 如果$res是false，说明插入失败，跳转回注册页面
        header('register.html');
    }

    //断开链接
    mysqli_close($conn);
?>
