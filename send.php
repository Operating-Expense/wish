<?php


    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $date = $_POST['date'];

echo $name;
    echo($sname);
    echo($phone);
    echo($email);
    echo($date);

    $from = 'spa';

    $message = "Name: " . $name . "\r\n" . "Phone: " . $phone . "\r\n" . "Email: " . $email . "\r\n" . "Date: " . $date . "\r\n";
    mail('spinne92@mail.ru', 'new post ', $message, 'From:'.$from);
    $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'index.html';
    exit();
?>