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

	playerSpeed = 7;
	playerWidth = 60;
	playerHeight=60;

	spriteLoop = 3;
	spriteCount = 0;
	sprites=0;
	spriteNum = 1;

	jumping = 0;
	jumpVal = 9.5;
	jumpLength = 35;

	collision = false;
	collisionTop = false;
	gravityVal = 1;
	gravityChange = .7;


    background = document.getElementById('background');
    parallax = document.getElementById('parallax');
    player = document.getElementById('player');
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

function createObject(i,xVal,yVal,widthVal,heightVal,type,movementSpeed,movementRange,direction){
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
	    defineProperty(platforms[i], 'direction', direction);   	     
    }

    obstacleNumber++;

    /*Outlines objects for level creation and testing.*/
    if (platforms[i].type != 'enemy' && platforms[i].type != 'enemy1' && platforms[i].type != 'goal' && platforms[i].type != 'lifePiece'){
   		input = document.createElement('div');
  		input.style.top = platforms[i].yVal + 'px';
  		input.style.left = platforms[i].xVal + 'px';
  		input.style.width = platforms[i].widthVal + 'px';
  		input.style.height = platforms[i].heightVal + 'px';	
    	input.setAttribute('id','platform' + i)
    	input.className = platforms[i].type;
    	document.getElementById('background').appendChild(input);
    }

    if (platforms[i].type == 'enemy' || platforms[i].type == 'enemy1' || platforms[i].type == 'goal' || platforms[i].type == 'lifePiece'){
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
	$('.enemy, .enemy1, .lifePiece').remove();
	obstacleNumber = 0;
	i = 0;

	backPositionX=0;
	parallaxPositionX=0;

	instructionNumber = 0;

	$('#instructions').html("");
	$('#instructions').fadeOut("");

	level=number;

	$('#parallax').attr('src','imgs/map' + number + '_parallax.jpg');
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

	if (number == 2){
		createObject(i,0,263,200,350,'platform');
	    i++;
		createObject(i,200,554,720,90,'platform');
	    i++;
		createObject(i,520,440,140,200,'platform');
	    i++;
		createObject(i,660,490,70,100,'platform');
	    i++;
		createObject(i,220,494,60,60,'enemy',6,260,'horizontal');
		i++;
		createObject(i,873,438,212,28,'platform');
	    i++;
		createObject(i,964,20,30,30,'lifePiece');
	    i++;
		createObject(i,884,378,60,60,'enemy',4,142,'horizontal');
	    i++;
		createObject(i,1475,248,250,362,'platform');
	    i++;
		createObject(i,1650,150,125,510,'platform');
	    i++;
		createObject(i,1650,150,300,20,'platform');
	    i++;
		createObject(i,1650,246,600,30,'platform');
	    i++;
		createObject(i,1650,268,400,400,'platform');
	    i++;
		createObject(i,2200,563,1000,400,'platform');
	    i++;
		createObject(i,1400,202,75,402,'platform');
	    i++;
		createObject(i,1300,524,250,362,'platform');
	    i++;
		createObject(i,2350,88,399,72,'platform');
	    i++;

		createObject(i,1300,470,60,60,'enemy',2,30,'horizontal');
		i++;
		createObject(i,1475,188,60,60,'enemy',6,125,'horizontal');
		i++;
		createObject(i,1820,188,60,60,'enemy',8,350,'horizontal');
		i++;
		createObject(i,1800,198,30,30,'lifePiece');
	    i++;
		createObject(i,2230,523,30,30,'lifePiece');
	    i++;
		createObject(i,2200,350,150,70,'platform');
	    i++;
		createObject(i,2400,28,60,60,'goal');

		instructionTotal = 2;

		playerPositionX = 100;
		playerPositionY = 200;

		backWidth = 2593;

		$('#instructions').html("<h1>Watch Out! <img src='imgs/enemy.png'/>'s can kill you. Jump on their heads to kill them.</h1>");
						$('.platform, .ground').remove(); /*	For level creation	*/
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
		createObject(i,-200,173,532,60,'platform',3,400,'horizontal');		
		i++;
		createObject(i,335,503,90,90,'enemy1',2,100,'horizontal');	
		i++;
		createObject(i,750,443,60,60,'enemy',5,200,'horizontal');	
		i++;
		createObject(i,500,443,60,60,'enemy',2,50,'horizontal');	
		i++;
		createObject(i,700,173,532,60,'platform');		
		i++;
		createObject(i,1000,113,60,60,'goal');	

		instructionTotal = 1;

		playerPositionX = 100;
		playerPositionY = 460;	

		backWidth = 3000;
	}
}

function startLevel(){
	$('.currentBG, #player').fadeIn();
}

$(function(){
	createLevel(1);
	startLevel();
});