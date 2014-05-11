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
	playerSpeed = 3;

	jumping = 0;
	jumpVal = 4.5;
	jumpLength = 60;

	collision = false;
	collisionTop = false;
	gravityVal = 1;
	gravityChange = .7;
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

    if (movementSpeed){
	    defineProperty(platforms[i], 'movementSpeed', movementSpeed);    	
	    defineProperty(platforms[i], 'movementRange', movementRange);    
	    defineProperty(platforms[i], 'movementTotal', 0);    	
	    defineProperty(platforms[i], 'dying', false);      
    }

    obstacleNumber++;

    /*Outlines objects for level creation and testing.*/
    if (platforms[i].type != 'enemy'){
   		input = document.createElement('div');
  		input.style.top = platforms[i].yVal + 'px';
  		input.style.left = platforms[i].xVal + 'px';
  		input.style.width = platforms[i].widthVal + 'px';
  		input.style.height = platforms[i].heightVal + 'px';	
    	input.setAttribute('id','platform' + i)
    	input.className = platforms[i].type;
    	document.getElementById('background').appendChild(input);
    }

    if (platforms[i].type == 'enemy'){
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

//	Send platform data to functions on load.

function createLevel(number) {
	platforms.length = 0
						$('.platform, .goal, .enemy').remove(); /*	For level creation	*/
	obstacleNumber = 0;
	i = 0;

	instructionNumber = 0;

	$('#instructions').html("");

	level=number;

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

		instructionTotal = 2;

		playerPositionX = 300;
		playerPositionY = 560;

		backWidth = 1000;

		$('#instructions').html('<h1>Use <span class="key">A</span> and <span class="key">D</span> to move around.</h1>');
	}

	if (number == 2){
		createObject(i,0,563,592,60,'platform');
		i++;
		createObject(i,500,533,532,60,'platform');	
		i++;
		createObject(i,-250,503,532,60,'platform');	
		i++;
		createObject(i,-200,533,532,60,'platform');		
		i++;
		createObject(i,-200,233,532,60,'platform');		
		i++;
		createObject(i,335,503,60,60,'enemy',2,100);	
		i++;
		createObject(i,750,473,60,60,'enemy',5,200);	
		i++;
		createObject(i,500,473,60,60,'enemy',2,50);	

		playerPositionX = 100;
		playerPositionY = 460;	
	}
}

function startLevel(){
	$('.currentBG, #player').fadeIn();
}

$(function(){
	createLevel(1);
	startLevel();
});