<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="src/img/tetris.png">
    <link rel="stylesheet" type="text/css" href="src/css/styles.css" />
    <title>Welcome to Tetris</title>
</head>
<body>
    <?php 
        // Session Variables
        session_start();
        $_SESSION["gameLive"] = false;

        // Manages logging in
        // if the user has just logged in and the details are incorrect, displays an error message
        if (isset($_SESSION['incorDetails'])) {
            if ($_SESSION["incorDetails"] == true) {
                echo("<script>alert('Incorrect username or password');</script>");
                $_SESSION["incorDetails"] = false;
            }
        }

        //connect to mysql db
        include "src/php/conn.php";

        // Manages registering
        // If the user just created an account it is now added to the database
        if (isset($_POST['registerbutton'])) {
            $username = mysqli_real_escape_string($link, $_POST['uname']);
            $firstName = mysqli_real_escape_string($link, $_POST['fname']);
            $lastName = mysqli_real_escape_string($link, $_POST['lname']);
            $password1 = mysqli_real_escape_string($link, $_POST['pword1']);
            $password2 = mysqli_real_escape_string($link, $_POST['pword2']);
            $display = mysqli_real_escape_string($link, $_POST['display']);

            if ($display == 'yes') {
                $display = 1;
            }
            else {
                $display = 0;
            }

            // Checks the username is not already in use
            $sql_query = "SELECT * FROM Users WHERE `UserName` = '" . $username . "'";
            $query = mysqli_query($link, $sql_query);
            $result = mysqli_fetch_assoc($query); 
            if ($result != null) {
                if ($result['UserName'] == $username) {
                    $_SESSION["dupUsername"] = true;
                    header("location: register.php");
                }
            }

            // Encryption of passwords if they match
            if($password1 == $password2){
                //$password = password_hash($password1, PASSWORD_DEFAULT);
                $password = $password1;

                $password = password_hash($password, PASSWORD_DEFAULT); //applys hash to password so it is encrypted

                //adds the user to the database
                $sql = "INSERT INTO Users VALUES ('$username', '$firstName', '$lastName', '$password', '$display')";
                
                if (mysqli_query($link, $sql)) {
                    //Records added successfully to tetris tbl.
                } else {
                    exit("ERROR: Could not execute $sql. ". mysqli_error($link));
                } 
                
                $_SESSION["username"] = $username;                    
            } else {
                //if passwords don't match outputs error and ends script
                $_SESSION["passwordMatch"] = true;
                header("location: register.php");
            }
        }

        // logs user out if logout button pressed
        if (isset($_POST['logout'])) {
            session_destroy();
            header("location: index.php");
        }

        include "src/html/navbar.php";
    ?>
    
    <div class="main flex-container">
        <div class="flex-container">
            <?php 
               

                //makes sure user is logged in before they go to the game
                if (!isset($_SESSION["username"])) {
                    include "src/html/not_logged.html";
                }
                else{
                    //button with message to play the game
                    $prevPage = "index";
                    $message = "Click here to play!";
                    include "src/html/button.php"; 
                }
            ?>  
        </div>
    </div>
</body>
</html> 