<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="src/img/tetris.png">
    <link rel="stylesheet" type="text/css" href="src/css/styles.css" />
    <script src="src/js/tetris.js"> </script>
    <title>Play Tetris</title>
</head>
<body>
    <?php 
        session_start();
        //Checks that the user is logged into the server to access certain pages
        if ((!isset($_SESSION["username"]) || $_SESSION["username"] == null)) {
            header("location: index.php");
        }
        
        include "src/html/navbar.php"; 
    ?>
    <div class="main flex-container">
        <div class="box flex-container vertical">
            <?php
                if (!$_SESSION["gameLive"]) {
                    //button with message to play the game
                    $message = "start the game";
                    $prevPage = "tetris";
                    include "src/html/button.php"; 
                }
                else {
                    include "src/html/tetris_game.php";
                }
            ?>
        </div>
    </div>
</body>
</html>