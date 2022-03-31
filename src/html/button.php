<button type="submit" onclick="window.location.href='tetris.php';" class="box" id="logged">
    <?php 
        echo "<h2>" . $message . "</h2>"; 
    ?>
</button>

<?php
    if ($prevPage == "tetris") {
        $_SESSION["gameLive"] = True;
    }
    else {
        $_SESSION["gameLive"] = False;
    }
?>