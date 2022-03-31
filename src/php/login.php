<?php
//connecting to db server
include("conn.php");


//allows session variables
session_start();

//escape user inputs for security (stops special charcters being used so no SQL injection is possible)
$username = mysqli_real_escape_string($link, $_POST['uname']);
$password = mysqli_real_escape_string($link, $_POST['pword']);

//function to return record of username
function query($username, $link){
    $sql_query = "SELECT * FROM `Users` WHERE `username` = '" . $username . "'";
    $query = mysqli_query($link, $sql_query);
    $result = mysqli_fetch_assoc($query); 
    
    return $result;
}

//Checks username is valid
if (query($username, $link)) {
    $userData = query($username, $link);
}
else {
    $_SESSION["incorDetails"] = true;
    header("location: ../../index.php");
}

//Verifies password
if (password_verify($password, $userData['Password'])) {
    //sets session variable
    $_SESSION["username"] = $username;
}
else {
    $_SESSION["incorDetails"] = true;
    header("location: ../../index.php");
}

//close connection to database
include("disconn.php");

//go back to index.php
header("location: ../../index.php");