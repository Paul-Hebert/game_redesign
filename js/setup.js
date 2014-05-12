//****************************************************************************************//
//	Set Variables	//
//****************************************************************************************//

$(function(){
	//	Positioning vars
	backPositionX = 0;
	backPositionY = 0;

	// User input vars

	userInput = false;
	updated = true;

	screenWidth = $("#screen").width();
	screenHeight = $("#screen").height();

	//	Character status vars
	lives = 3;
	lifePieces = 0;

	playerSpeed = 6;

	jumping = 0;
	jumpVal = 9;
	jumpLength = 30;

	collision = false;
	collisionTop = false;
	gravityVal = 1;
	gravityChange = .7;


    background = document.getElementById('background');
    parallax = document.getElementById('parallax');

});
//****************************************************************************************//
//	Create Platforms	//
//****************************************************************************************//

//	Create Array

var platforms = new Array();

//	Define prototype characteristics

var config = {
	writable: true,
	enumerable: true,
	configurable: true
};
 
//	Platform creation functions

function defineProperty(obj, name, value){
	config.value = value;
	Object.defineProperty(obj, name, config);
}

function createObject(i,xVal,yVal,widthVal,heightVal,type,movementSpeed,movementRange){
  platforms[i] = Object.create(null);
    defineProperty(platforms[i], 'xVal',xVal);
    defineProperty(platforms[i], 'yVal',yVal);
    defineProperty(platforms[i], 'widthVal',widthVal);
    defineProperty(platforms[i], 'heightVal',heightVal);
    defineProperty(platforms[i], 'type', type);
	defineProperty(platforms[i], 'dying', false); 

    if (movementSpeed != null){
	    defineProperty(platforms[i], 'movementSpeed', movementSpeed);    	
	    defineProperty(platforms[i], 'movementRange', movementRange);    
	    defineProperty(platforms[i], 'movementTotal', 0);    	     
    }

    obstacleNumber++;

    /*Outlines objects for level creation and testing.
    if (platforms[i].type != 'enemy' && platforms[i].type != 'goal' && platforms[i].type != 'lifePiece'){
   		input = document.createElement('div');
  		input.style.top = platforms[i].yVal + 'px';
  		input.style.left = platforms[i].xVal + 'px';
  		input.style.width = platforms[i].widthVal + 'px';
  		input.style.height = platforms[i].heightVal + 'px';	
    	input.setAttribute('id','platform' + i)
    	input.className = platforms[i].type;
    	document.getElementById('background').appendChild(input);
    }*/

    if (platforms[i].type == 'enemy' || platforms[i].type == 'goal' || platforms[i].type == 'lifePiece'){
    	input = document.createElement('div');
  		input.style.top = platforms[i].yVal + 'px';
  		input.style.left = platforms[i].xVal + 'px';
  		input.style.width = platforms[i].widthVal + 'px';
  		input.style.height = platforms[i].heightVal + 'px';	
    	input.setAttribute('id','platform' + i)
    	input.className = platforms[i].type;
    	document.getElementById('background').appendChild(input);
    }
}

//	Send level info to functions on load.

function createLevel(number) {
	platforms.length = 0
						$('.platform, .goal, .ground').remove(); /*	For level creation	*/
	$('.enemy, .lifePiece').remove();
	obstacleNumber = 0;
	i = 0;

	backPositionX=0;
	parallaxPositionX=0;

	instructionNumber = 0;

	$('#instructions').html("");
	$('#instructions').fadeOut("");

	level=number;

	$('.parallax').attr('src','imgs/map' + number + '_parallax.jpg');
	$('.back').attr('src','imgs/map' + number + '_back.png');
	$('.front').attr('src','imgs/map' + number + '_front.png');
	$('.constant_front').attr('src','imgs/map' + number + '_constant_front.png');


	if (number == 1){
		createObject(i,0,563,592,60,'platform');
	    i++;
		createObject(i,337,344,220,90,'platform');
	    i++;
		createObject(i,805,560,190,60,'platform');
	    i++;
		createObject(i,773,238,212,128,'platform');
	    i++;
		createObject(i,853,160,60,60,'goal');

		instructionTotal = 3;

		playerPositionX = 300;
		playerPositionY = 560;

		backWidth = 1000;

		$('#instructions').html('<h1>Use <span class="key">A</span> and <span class="key">D</span> to move around.</h1>');
						$('.platform, .goal, .ground').remove(); /*	For level creation	*/
	}

	if (number == 3){
		createObject(i,0,563,592,60,'platform');
		i++;
		createObject(i,500,503,532,60,'platform');	
		i++;
		createObject(i,-250,473,532,60,'platform');	
		i++;
		createObject(i,-200,533,532,60,'platform');		
		i++;
		createObject(i,-200,173,532,60,'platform',3,400);		
		i++;
		createObject(i,335,503,60,60,'enemy',2,100);	
		i++;
		createObject(i,750,443,60,60,'enemy',5,200);	
		i++;
		createObject(i,500,443,60,60,'enemy',2,50);	
		i++;
		createObject(i,700,173,532,60,'platform');		
		i++;
		createObject(i,1000,113,60,60,'goal');	

		instructionTotal = 1;

		playerPositionX = 100;
		playerPositionY = 460;	

		backWidth = 3000;

	}

	if (number == 2){
		createObject(i,0,263,200,350,'platform');
	    i++;
		createObject(i,200,544,720,90,'platform');
	    i++;
		createObject(i,520,440,140,200,'platform');
	    i++;
		createObject(i,660,490,70,100,'platform');
	    i++;
		createObject(i,220,484,60,60,'enemy',3,260);
		i++;
		createObject(i,873,438,212,28,'platform');
	    i++;
		createObject(i,964,80,30,30,'lifePiece');
	    i++;
		createObject(i,884,378,60,60,'enemy',2,142);
	    i++;
		createObject(i,1400,238,250,362,'platform');
	    i++;
		createObject(i,1650,140,125,510,'platform');
	    i++;
		createObject(i,1650,140,300,30,'platform');
	    i++;
		createObject(i,1650,238,600,30,'platform');
	    i++;
		createObject(i,1650,268,400,400,'platform');
	    i++;
		createObject(i,2200,563,1000,400,'platform');
	    i++;
		createObject(i,1400,198,75,402,'platform');
	    i++;
		createObject(i,1300,520,250,362,'platform');
	    i++;
		createObject(i,2350,88,399,72,'platform');
	    i++;

		createObject(i,1300,460,60,60,'enemy',1,30);
		i++;
		createObject(i,1475,178,60,60,'enemy',3,125);
		i++;
		createObject(i,1820,178,60,60,'enemy',4,350);
		i++;
		createObject(i,1800,198,30,30,'lifePiece');
	    i++;
		createObject(i,2230,523,30,30,'lifePiece');
	    i++;
		createObject(i,2200,350,150,70,'platform');
	    i++;
		createObject(i,2550,28,60,60,'goal');

		instructionTotal = 2;

		playerPositionX = 100;
		playerPositionY = 200;

		backWidth = 2600;

		$('#instructions').html("<h1>Watch Out! <img src='imgs/enemy.png'/>'s can kill you. Jump on their heads to kill them.</h1>");
	}
}

function startLevel(){
	$('.currentBG, #player').fadeIn();
}

$(function(){
	createLevel(1);
	startLevel();
});