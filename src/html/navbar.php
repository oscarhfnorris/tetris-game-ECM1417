<div class="navbar">
    <div class="small">
        <a href="index.php" name="home"> Home </a>
    </div>
    <div class="big">
        <!-- used to help navbar formatting-->
    </div>
    <div class="small">
        <a href="tetris.php" name="tetris"> Tetris </a>    
    </div>
    <div class="small">
        <a href="leaderboard.php" name="leaderboard"> Leaderboard </a>
    </div>

    <div id='logout'>
        <?php  
            if (isset($_SESSION["username"]))  { ?>
                <form id='logout' action='index.php' method='post'>
                    <input type="hidden" name="logout" value="1">
                    <input id='logout' type='image' name='logout' src='src/img/log-out.png' class='btTxt submit' />
                </form>
            <?php } ?>
    </div>
</div>