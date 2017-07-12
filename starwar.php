<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
canvas {
    border:1px solid #d3d3d3;
    background-color: #f1f1f1;
}
</style>
</head>
<body onload="startGame()">
<button onclick="shoot()">Hit</button>
<div id="state"></div>
<div>Lifespan of Dark Vador: <span id="dark_vador1"></span></div>
<div>Lifespan of Strom Trooper: 
<?php for($i=1; $i<6; $i++){ 
	printf('<span id="strom_trooper%s">gg</span>',$i);
	printf(',');
} ?>
</div>
<div>Lifespan of Drone Trooper: </div>

<script type="text/javascript" src="game.js"></script>

</body>
</html>