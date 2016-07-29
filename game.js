
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");





	
	

//Synth parameter variables	
	
var attackslider = document.getElementById("attack");	
var decayslider = document.getElementById("decay");		
var volumeslider = document.getElementById("volume");	
var panslider = document.getElementById("pan");
var waveformselect = document.getElementById("waveform");	
var pitchbendslider = document.getElementById("pitchbend");	
var delayslider = document.getElementById("echodelay");	
var feedbackslider = document.getElementById("echofeedback");	
var filterslider = document.getElementById("echofilter");	
var durationslider = document.getElementById("reverbduration");	
var revdecayslider = document.getElementById("reverbdecay");	
var demo = document.getElementById("demo");


var changer;
var attack = 0;
var decay = 1;
var waveform = "sawtooth";
var volume = 1;
var pan = 0;
var wait = 0;
var pitchbend = 0;
var reversebend;
var pitchrange = 0;
var dissonance = 0;
var echo = {
	
	delay : 0,
	feedback : 0,
	filter : 2000,

};
	
 var reverb = {
	
	duration : 0.8,
	decay : 0.5,
	reverse : false,

};	
	
	

//Canvas keyboard variables

var mouse = {
  x : 0, 
  y : 0,
  down: false
};

var whitekey = {
	
	x : 0,
	y : 0,
	width : 30,
	height : 120,
	mover : 0,
	length : 0
	
}

whitekey.mover = whitekey.width;

var blackkey = {
	
	x : ((whitekey.width/2)+(whitekey.width/6)),
	y : 0,
	width : (whitekey.width/2),
	height : ((whitekey.height/3)*2),
	mover : 0,
	holder : 0,
	length : 0
	
}

var t = 0;
var black = false;
var keycounter;
var octaves = 2;
var keystotal = 12*octaves;
whitekey.length = 7* octaves;
blackkey.length = 5* octaves;

blackkey.mover = ((blackkey.width*2)+(whitekey.width/6));



//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------



//Main loop

function Update(){
	
	UpdateValues();
	window.requestAnimationFrame(Update);
}

Draw(); 

window.requestAnimationFrame(Update);


//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------


//Checks which key is being pressed and plays the corresponding sound

function KeyIdCheck() {
	
	
	whitekey.mover = whitekey.x;
	
	//Black keys--------------------------
	
	for (r = 0; r < octaves; r++){
		t=1;
		
		for (q = 0; q< 5; q++){
		
		
		
		if (mouse.x >= (blackkey.x-1) && mouse.x < (blackkey.x + blackkey.width)){
				
				if (mouse.y > blackkey.y  && mouse.y < (blackkey.y + blackkey.height)){
				
				
				
					if(r==1){
					
						Play((t+12));
					
					} else if (r==2) {
						
						Play((t+24));
						
					} else {
						
						Play(t);
						
					}
				
				
				black = true;
				
				}
				
			}

			  blackkey.x += blackkey.mover;
			  
			  
			   if(q == 0) {
				   t+=2;
				   blackkey.holder = blackkey.mover;
				   blackkey.mover += ((whitekey.width/3)*2);
				   
			   }
			   if (q == 1){
				   t+=3;
				 blackkey.mover = ((blackkey.width*2)+(whitekey.width/12));  
				   
			   }
			   if (q == 2){
				   t+=2;
  
			   }
			   if (q == 3){
				   t+=2;
				 blackkey.mover += ((whitekey.width/3)*2+(whitekey.width/12)); 
				   
			   }
			    if (q == 4){
				   t+=2;
				 blackkey.mover = ((blackkey.width*2)+(whitekey.width/6));
				   
			   } 
		}
	  }
	  
	  //White keys--------------------------
	  
	  if(black == false){
		   for (r = 0; r < octaves; r++){
			t=0;
			for (q = 0; q< 7; q++){

				  if (mouse.x > whitekey.mover && mouse.x < (whitekey.mover + whitekey.width)){
					
					if (mouse.y > whitekey.y  && mouse.y < (whitekey.y + whitekey.height)){
					
					
						if(r==1){
						
							Play((t+12));
						
						} else if (r==2) {
							
							Play((t+24));
							
						} else {
							
							Play(t);
							
						}
					}
				}
			  
			  if (t == 4){  
				  t++;  
			  } else {  
				 t+=2; 
			  }
			  
			   whitekey.mover += whitekey.width;
			  
			 
			}
			  
			
		  }  
	  }
	whitekey.mover = whitekey.x;
	blackkey.x = ((whitekey.width/2)+(whitekey.width/6));
	black = false;
	
		
}




//Draws the Canvas keyboard

function Draw(){
	
	for (p = 0; p < octaves; p++){
		
		for (i = 0; i< 7; i++){


		  c.beginPath();
		  c.rect(whitekey.x, whitekey.y, whitekey.width, whitekey.height);
		  c.fillStyle = 'white';
		  c.fill();
		  c.lineWidth = 2;
		  c.strokeStyle = 'black';
		  c.stroke();
		  whitekey.x += whitekey.mover;
		}
		  
		
	  }  
	for (p = 0; p < octaves; p++){
		
		for (i = 0; i< 5; i++){

				
			  c.beginPath();
			  c.rect(blackkey.x, blackkey.y, blackkey.width, blackkey.height);
			  c.fillStyle = 'black';
			  c.fill();
			  c.lineWidth = 2;
			  c.strokeStyle = 'black';
			  c.stroke();
			  blackkey.x += blackkey.mover;
			   if(i == 0) {
				   
				   blackkey.holder = blackkey.mover;
				   blackkey.mover += ((whitekey.width/3)*2);
				   
			   }
			   if (i == 1){
				   
				 blackkey.mover = ((blackkey.width*2)+(whitekey.width/12));  
				   
			   }
			   if (i == 3){
				   
				 blackkey.mover += ((whitekey.width/3)*2+(whitekey.width/12)); 
				   
			   }
			    if (i == 4){
				   
				 blackkey.mover = ((blackkey.width*2)+(whitekey.width/6));
				   
			   }
		}
	  }
	  
	whitekey.x = 0;
	blackkey.x = ((whitekey.width/2)+(whitekey.width/6));
	
}


//Updates the value of synth parameters based on HTML input

function UpdateValues(){
	
	changer = attackslider.value;
	changer /= 100;
	attack = changer;
	
	
	changer = decayslider.value;
	changer /= 100;
	decay = changer;
	
	changer = volumeslider.value;
	changer /= 100;
	volume = changer;
	demo.innerHTML = changer;
	
	changer = panslider.value;
	changer /= 10;
	pan = changer;
	
	pitchbend = pitchbendslider.value;
	
	changer = delayslider.value;
	changer /= 100;
	echo.delay = changer;
	
	changer = feedbackslider.value;
	changer /= 10;
	echo.feedback = changer;
	
	echo.filter = filterslider.value;
	
	changer = feedbackslider.value;
	changer /= 10;
	echo.feedback = changer;
	
	changer = durationslider.value;
	changer /= 10;
	reverb.duration = changer;
	
	changer = revdecayslider.value;
	changer /= 10;
	reverb.decay = changer;
	
	waveform = waveformselect.value;
	
}





//Event listeners


function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	
	return {
		x: evt.clientX - rect.left,
          y: Math.floor((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
	};
  }


  
  canvas.addEventListener('mousemove', function(evt) {
	  
	var mousePos = getMousePos(canvas, evt);
	mouse.x = mousePos.x;
	mouse.y = mousePos.y;
  }, false);




canvas.addEventListener('mouseup', function(e){
  mouse.down = false;
});




canvas.addEventListener('mousedown',function(e){
	

    mouse.down = true;
	
	 KeyIdCheck(); 
	 
	
});

//Keyboard keys

z(0).press = function(){ Play(0) };
s(0).press = function(){ Play(1) };
x(0).press = function(){ Play(2) };
d(0).press = function(){ Play(3) };
Cee(0).press = function(){ Play(4) };
v(0).press = function(){ Play(5) };
g(0).press = function(){ Play(6) };
b(0).press = function(){ Play(7) };
h(0).press = function(){ Play(8) };
n(0).press = function(){ Play(9) };
j(0).press = function(){ Play(10) };
m(0).press = function(){ Play(11) };
w(0).press = function(){ Play(12) };
three(0).press = function(){ Play(13) };
e(0).press = function(){ Play(14) };
four(0).press = function(){ Play(15) };
r(0).press = function(){ Play(16) };
tee(0).press = function(){ Play(17) };
six(0).press = function(){ Play(18) };
y(0).press = function(){ Play(19) };
seven(0).press = function(){ Play(20) };
u(0).press = function(){ Play(21) };
eight(0).press = function(){ Play(22) };
ii(0).press = function(){ Play(23) };
o(0).press = function(){ Play(24) };







      
	  