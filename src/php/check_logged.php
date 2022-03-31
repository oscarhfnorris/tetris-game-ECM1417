<?php
//Checks that the user is logged into the server to access certain pages
if (!isset($_SESSION["username"]) {
    session_start();
}
else {
    header("location: ../../index.php");
}
?>