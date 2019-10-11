var socket;

function setup() {
	createCanvas(600, 400);
	background(51);
	socket = io.connect('http://localhost:3000');
	socket.on('mouse',newdrawing);
}

function newdrawing(data){
	noStroke();
	fill(255,0,100);
	ellipse(data.x, data.y, 10, 10);
}


function mouseDragged(){
	 console.log("sending" +"X:"+ mouseX +"Y:"+mouseY );
	var data ={
		x:mouseX,
		y:mouseY
	}
	socket.emit('mouse', data);
 noStroke();
 fill(255,0,0);
 ellipse(mouseX, mouseY, 10, 10);
}
function draw() {
}