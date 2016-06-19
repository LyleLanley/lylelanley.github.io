var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var width = canvas.width;
var height = canvas.height;
var x = Math.floor((Math.random() * 255) + 1);






/* function Update(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	c.clearRect(0,0,canvas.width, canvas.height);
	c.fillRect(0, 0, canvas.width, canvas.height);
	
	window.requestAnimationFrame(Update);
	
}

Update(); */

window.addEventListener("resize", function(){
	var r = Math.floor((Math.random() * 255) + 1);
	var g = Math.floor((Math.random() * 255) + 1);
	var b = Math.floor((Math.random() * 255) + 1);
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	/* c.fillStyle = 'rgb('+r+','+g+','+b+')'; */
	c.clearRect(0,0,canvas.width, canvas.height);
	c.fillRect(0, 0, canvas.width, canvas.height);
	
});