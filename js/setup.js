//****************************************************************************************//
//	Set Variables	//
//****************************************************************************************//

//	Obstacle creation vars

var obstacleNumber = 0;

i = 0;


$(function(){
	//	Positioning vars
	backPositionX = 0;
	backPositionY = 0;

	playerPositionX = 300;
	playerPositionY = 560;

	// User input vars

	userInput = false;
	updated = true;

	backWidth = $(".currentBG").width();
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

function createObject(i,xVal,yVal,widthVal,heightVal,type){
  platforms[i] = Object.create(null);
    defineProperty(platforms[i], 'xVal',xVal);
    defineProperty(platforms[i], 'yVal',yVal);
    defineProperty(platforms[i], 'widthVal',widthVal);
    defineProperty(platforms[i], 'heightVal',heightVal);
    defineProperty(platforms[i], 'type', type);

    obstacleNumber++;

  /* Outlines objects for level creation and testing.
  input = document.createElement('div');
  	input.style.top = platforms[i].yVal + 'px';
  	input.style.left = platforms[i].xVal + 'px';
  	input.style.width = platforms[i].widthVal + 'px';
  	input.style.height = platforms[i].heightVal + 'px';	
    input.className = platforms[i].type;
    document.getElementById('background').appendChild(input);*/
}

//	Send platform data to functions on load.

$(function() {
	createObject(i,0,563,592,60,'platform');
    i++;
	createObject(i,337,344,220,90,'platform');
    i++;
	createObject(i,805,560,190,60,'platform');
    i++;
	createObject(i,773,238,212,128,'platform');
    i++;
	createObject(i,853,160,60,60,'goal');
});

level=1;
instructionNumber = 0;