<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="src/img/tetris.png">
    <link rel="stylesheet" type="text/css" href="src/css/styles.css" />
    <title>Register</title>
</head>
<body>
    <?php 
        include "src/html/navbar.php"; 

        // checks the passwords match
        session_start();

        $_SESSION["gameLive"] = false;

        if (isset($_SESSION['passwordMatch'])) {
            if ($_SESSION["passwordMatch"] == true) {
                echo("<script>alert('Passwords do not match');</script>");
                $_SESSION["passwordMatch"] = false;
            }
        } 
        if (isset($_SESSION["dupUsername"])) {
            if ($_SESSION["dupUsername"] == true) {
                echo("<script>alert('Username already in use');</script>");
                $_SESSION["dupUsername"] = false;
            }
        }
    ?>

    <div class="main flex-container">
        <div class="flex-container">
            <div class="box">
                <form action="index.php" method="post" class="flex-container form">
                    <h2>Register</h2><br>
                    <input type="text" placeholder="First Name" name="fname" required>
                    <input type="text" placeholder="Last Name" name="lname" required><br>
                    <input type="text" placeholder="Username" name="uname" required><br>
                    <input type="password" placeholder="Password" name="pword1" required>
                    <input type="password" placeholder="Confirm Password" name="pword2" required><br>
                    <label for="display" id="register-label"><strong>Display Scores on leaderboard</strong></label>
                    <div class="flex-container">
                        <input type="radio" name="display" value="yes" id="display1" required>
                        <label for="display1" id="register-label">yes</label>
                        <input type="radio" name="display" value="no" id="display2" required>
                        <label for="display2" id="register-label">no</label>
                    </div><br>
                    <input type="submit" value="submit" name = "registerbutton" id="register-bottom" class="button">
                </form>
            </div>
        </div>
    </div>
</body>
</html>