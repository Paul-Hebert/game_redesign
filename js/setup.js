//****************************************************************************************//
//	Set Variables	//
//****************************************************************************************//

//	Obstacle creation vars

var obstacleNumber = 0;

i = 0;

//	Positioning vars
$(function(){
	backPositionX = 0;
	backPositionY = 0;


	playerPositionX = 300;
	playerPositionY = 560;

	// User input vars

	userInput = false;
	updated = true;

	backWidth = $("#currentBG").width();
	screenWidth = $("#screen").width();
	screenHeight = $("#screen").height();
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

  input = document.createElement('div');
  	input.style.top = platforms[i].yVal + 'px';
  	input.style.left = platforms[i].xVal + 'px';
  	input.style.width = platforms[i].widthVal + 'px';
  	input.style.height = platforms[i].heightVal + 'px';	
    input.className = platforms[i].type;
    document.getElementById('background').appendChild(input);
    obstacleNumber++;

}

//	Send platform data to functions on load.

$(function() {
	createObject(i,0,558,592,60,'platform');
    i++;
	createObject(i,337,339,220,95,'platform');
    i++;
	createObject(i,805,555,190,60,'platform');
    i++;
	createObject(i,773,233,212,133,'platform');
    i++;
	createObject(i,800,175,40,40,'goal');
});