<?php
//listing server login values used to connect to database
/*
    They are listed as variables at the top, so that if one of the values is changed e.g. password,
    it doesn't have to be individually changed throughout the code 
*/
$domain = 'localhost';
$uname = 'on233'; //$uname used so that it doesn't interfere with any future variables called $username
$pass = 'WebDev2021';      //$pass used so that it doesn't interfere with any future variables called $password
$database = 'tetris';

//attempt to connect to the MYSQL server

$link = mysqli_connect($domain, $uname, $pass, $database);

//Check Connection (gives error if there is one)

if($link == false){
    die("ERROR: could not connect. ".mysqli_connect_error());
}
?>