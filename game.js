var myBullet;
var dark_vador;
var strom_trooper = []; 
var drone_trooper = []; 
 
function startGame(){
	myBullet = new bullet(245, 490, 10, 10);
	dark_vador = new bee('dark_vador', '1');
	for($i=1; $i<6; $i++){
		strom_trooper.push( new bee('strom_trooper', $i));
	}
	myGameArea.start();
}	
 
var myGameArea = { 
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 40);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
	myGameArea.clear();
	dark_vador.update();
	dark_vador.hitWall();
	dark_vador.x += 1;
	var myBee = [];
	myBee.push(dark_vador);
	
	for($x=0; $x<5; $x++){
		strom_trooper[$x].update();
		strom_trooper[$x].hitWall();
		strom_trooper[$x].x += 1;
		myBee.push(strom_trooper[$x]);
	}
	myBullet.update();
	myBullet.newPos();
	
	/*for($i=0; $i<myBee.length; $i++){
		if(myBullet.crashWith(myBee[$i])){
			checkHit(myBee[$i]);
			return;
		}
	}
	*/
	if(myBullet.crashWith(dark_vador)){
			checkHit(dark_vador);
			return;
		}
	
}

function checkHit(bee){
	var bee = bee.name;
	var n = bee.n;
	var id = bee.name+n;
	alert(id);
	var state;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myScore = JSON.parse(this.responseText);
			document.getElementById(id).innerHTML = myScore[bee][n];
			if(myScore['state'] == true) state = 'PLAYING'; 
			else state = 'GAME OVER';
			document.getElementById("state").innerHTML = state;
		}
	};
	var data = "?a="+bee+"&b="+n;
	xhttp.open("GET", "Game.php"+data, true);
	xhttp.send(null); 
				
	myBullet.update();
	myBullet.newPos();		
}

function bee(name, n){
	var img = new Image(65,10);
	img.src = name+".jpeg";
	this.x = Math.floor((Math.random() * 480) + 1);
	this.y = Math.floor((Math.random() * 470) + 1);
	this.name = name;
	this.n = n;
	this.update = function(){
		myGameArea.context.drawImage(img, this.x, this.y);
	}
	this.hitWall = function(){
		if(this.x >= 480){
			this.x = Math.floor((Math.random() * 480) + 1);
			this.y = Math.floor((Math.random() * 470) + 1);
		}
	}	
}

function bullet(x, y, width, height){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speed = 0;
	this.update = function() {
        myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
    }
	this.newPos = function() {
		this.y += this.speed;
		this.hitTop();
	}
	this.hitTop = function() {
        if (this.y <= 0) {
            this.y = 490; 
			this.speed = 0;
        }
    }
	this.crashWith = function(bee) {
        var bulletLeft = this.x;
        var bulletRight = this.x + (this.width);
        var bulletTop = this.y;
        var bulletBottom = this.y + (this.height);
        var beeLeft = bee.x;
        var beeRight = bee.x + 30;
        var beeTop = bee.y;
        var beeBottom = bee.y + 25;
        var crash = true;
        if ((bulletBottom < beeTop) || (beeBottom < bulletTop) || (bulletRight < beeLeft) || ( beeRight < bulletLeft )) {
			crash = false;
        }
		return crash;
    }
}

function shoot(){
	myBullet.speed = -20;
}

