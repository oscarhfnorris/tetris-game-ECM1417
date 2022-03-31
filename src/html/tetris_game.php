<?php 
    $_SESSION['resultsUpdated'] = false;
?>

<div class="flex-container">
    <form method="post" class = "flex-container flex-child">
        <button type="submit" name="stop" onclick="window.location.href='tetris.php';" class="box title" id="stop">Stop Game</button>
    </form>
    <div class="flex-conatiner flex-child">
        <div class="title flex-container">
            Score: <div class="flex-box" id="score" class="title flex-child"></div>
        </div>
    </div>
</div>

<audio autoplay loop><source="src/audio/bangerang.mp3">browser</audio>
<?php
    function stop() {
        $_SESSION["gameLive"] = False;
        header('Location: tetris.php');
    }
    if(array_key_exists('stop',$_POST)){
        stop();
     }
?>

<div class="tetris"><div id="tetris-bg"></div></div>


<script type="text/javascript" src="src/js/tetris.js"></script>
<script type="text/javascript" src="src/js/Square.js"></script>
<script type="text/javascript" src="src/js/GamePiece.js"></script>
<script type="text/javascript" src="src/js/GameBoard.js"></script>
<script>main()</script>