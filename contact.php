<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }
    $to = "example@gmail.com"; 
    $from = "from@example.com"; 
    $headers = "From: Yale Contact Form <$from>\r\n";
    $headers .= "Reply-To: $email\r\n";

    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n";
    $body .= "Message: \n$message";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: thank-you.html"); 
    } else {
        die("Failed to send email. Please try again later."); 
    }
}

?>