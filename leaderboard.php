<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="src/img/tetris.png">
    <link rel="stylesheet" type="text/css" href="src/css/styles.css" />
    <title>Leaderboard</title>
</head>
<body>
    <?php 
        session_start();
        $_SESSION["gameLive"] = false;

        include "src/html/navbar.php"; 

        //connect to mysql db
        include "src/php/conn.php";
    ?>


    <div class="main flex-container">
        <div class="box flex-container vertical">
            <div class="flex-container">
                <h1 class="box title">Leaderboard</h1>
            </div>
            <table class="leaderboard">
                <tr>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
                <?php
                // adds new score to leaderboard if the user has just completed a game 
                    if (isset($_POST['score']) && !$_SESSION['resultsUpdated']) {
                        $username = $_SESSION["username"];
                        $score = mysqli_real_escape_string($link, $_POST['score']);
                        
                        $sql_query = "INSERT INTO Scores (`Username`, `Score`) VALUES ('$username', '$score')";
                        if(mysqli_query($link, $sql_query)){
                            // Records added successfully to tbl
                        } else{
                            exit(" (ERROR: Could not execute $sql_query. ". mysqli_error($link));
                        }
                        $_SESSION['resultsUpdated'] = true;

                        
                    }

                    $sql_query = "SELECT * FROM Scores ORDER BY Score DESC";
                    $query = mysqli_query($link, $sql_query);
                    $numResults = 0;
                    while($row = mysqli_fetch_array($query)){   //Creates a loop to loop through results
                        $username = $row['Username'];
                        $score = $row['Score'];
                        
                        // sees if user wants their results shown
                        $sqlQuery = "SELECT * FROM Users WHERE UserName = '" . $username . "'";
                        $sqlResult = mysqli_query($link, $sqlQuery);
                        
                        while($x = mysqli_fetch_array($sqlResult)){             
                            if ($x["Display"] == 1 and $numResults < 15) {
                                $numResults = $numResults + 1;
                                echo "
                                <tr>
                                    <td>".$username."</td>
                                    <td>".$score."</td>
                                </tr>
                            ";
                            }
                        }
                    }
                ?>
            </table>
        </div>
    </div>
</body>
</html>