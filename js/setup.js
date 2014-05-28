//****************************************************************************************//
//	Set Variables	//
//****************************************************************************************//

$(function(){
	map = {68: false, 65: false, 87: false, 37: false, 38: false, 39: false};

	playerDirection = 'right';

	beginning = 0;

	//	Positioning vars
	backPositionX = 0;
	backPositionY = 0;

	// User input vars

	userInput = false;

	screenWidth = $("#screen").width();
	screenHeight = $("#screen").height();

	//	Character status vars

	playerSpeed = 7;
	playerWidth = 40;
	playerHeight=60;

	jumping = 0;
	jumpVal = 13;
	jumpLength = 23;

	collision = false;
	collisionTop = false;
	gravityVal = 1;
	gravityChange = 1.5;


    background = document.getElementById('background');
    parallax = document.getElementById('parallax');
    player = document.getElementById('player');

    backPositionY = 0;

    dying = false;

    enemyJump = false;

    lifePieceRotation = 0;

    overallPositionX = 50;

    moving = false;

 	enemyJump = false;
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
	defineProperty(platforms[i], 'gravityVal', 1); 


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

function createPitcher(i,xVal,yVal,widthVal,heightVal){
	createObject(i,xVal,yVal,5,heightVal,'platform');
	i++;
	createObject(i,xVal+widthVal-5,yVal,5,heightVal,'platform');
	i++;
	createObject(i,xVal + 10,yVal+heightVal-15,widthVal - 20,15,'pitcher');
}

//	Send level info to functions on load.

function createLevel(number) {
	platforms.length = 0
						$('.platform, .platform1, .goal, .ground').remove(); /*	For level creation	*/
	$('.enemy, .enemy1, .lifePiece, .spike, .button, .pitcher').remove();
	obstacleNumber = 0;
	i = 0;

	backPositionX=0;
	parallaxPositionX=0;

	instructionNumber = 0;

	$('#instructions').html("");
	$('#instructions').css('display','none')

	level=number;

	$('#parallax').attr('src','imgs/map' + number + '_parallax.jpg');
	$('.back').attr('src','imgs/map' + number + '_back.png');
	$('.front').attr('src','imgs/map' + number + '_front.png');
	$('.constant_front').attr('src','imgs/map' + number + '_constant_front.png');


	if (number == 1){
		createObject(i,0,563,592,60,'platform');
	    i++;
		createObject(i,337,344,220,90,'platform1');
	    i++;
		createObject(i,805,560,190,60,'platform');
	    i++;
		createObject(i,773,238,212,128,'platform1');
	    i++;
		createObject(i,853,160,60,60,'goal');

		instructionTotal = 3;

		playerPositionX = 50;
		if (lives < 3){
			playerPositionX = 150;
		}

		playerPositionY = 560;

		backWidth = 1000;

		$('#instructions').html('<h1>Use <span class="key">A</span> and <span class="key">D</span> to move around.</h1>');
						$('.platform, .platform1, .goal').remove(); /*	For level creation	*/
	}

	if (number == 2){
		$('#rocket').remove();

		createObject(i,0,263,200,350,'platform');
	    i++;
		createObject(i,200,554,720,90,'platform');
	    i++;
		createObject(i,520,440,140,200,'platform1');
	    i++;
		createObject(i,660,490,70,100,'platform1');
	    i++;
		createObject(i,220,494,97,60,'enemy',6,260,'horizontal');
		i++;
		createObject(i,873,438,212,28,'platform1');
	    i++;
		createObject(i,964,60,30,30,'lifePiece');
	    i++;
		createObject(i,1026,378,97,60,'enemy',-3,142,'horizontal');
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
		createObject(i,2350,88,200,72,'platform1');
		i++;
		createObject(i,1475,188,97,60,'enemy',6,125,'horizontal');
		i++;
		createObject(i,1820,188,97,60,'enemy',8,350,'horizontal');
		i++;
		createObject(i,1800,198,30,30,'lifePiece');
	    i++;
		createObject(i,2220,513,30,30,'lifePiece');
	    i++;
		createObject(i,2200,350,140,70,'platform1');
	    i++;
		createObject(i,2400,28,60,60,'goal');
	    i++;
		createPitcher(i,1310,370,79,160);

		instructionTotal = 3;

		playerPositionX = 100;
		playerPositionY = 200;

		backWidth = 2593;

		$('#instructions').html("<h1>Watch Out! <img src='imgs/monster.png'/>s can kill you. Jump on their heads to kill them.</h1>");
							$('.platform, .platform1, .pitcher').remove(); /*	For level creation	*/

	}

	if (number == 3){
		instructionTotal = 0;

		playerPositionX = 20;
		playerPositionY = 233;	

		backWidth = 2008;

		createObject(i,0,263,250,30,'platform');
		i++;
		createObject(i,0,363,450,70,'platform');
		i++;
		createObject(i,80,303,97,60,'enemy',5,250,'horizontal');
		i++;
		createObject(i,0,433,120,70,'platform');
		i++;		
		createObject(i,0,293,70,70,'platform');
		i++;
		createObject(i,135,448,30,30,'lifePiece');
		i++;
		createObject(i,700,303,102,600,'platform');
		i++;
		createObject(i,802,453,202,600,'platform');
		i++;
		createObject(i,892,433,60,27,'button',0,10,'vertical');
		i++;
		createObject(i,984,303,262,600,'platform');
		i++;
		createObject(i,1018,353,174,60,'spike',0,100);
		i++;
		createObject(i,-1018,120,174,60,'spike1',0,100);
		i++;
		createObject(i,1004,00,132,110,'platform');
		i++;
		createObject(i,1008,248,97,60,'enemy',4,138,'horizontal');
		i++;
		createObject(i,1206,463,602,223,'platform');
		i++;
		createObject(i,000,510,700,600,'platform');
		i++;
		createObject(i,120,450,584,60,'spike',0,'none');
		i++;
		createObject(i,1004,-100,202,140,'platform');
		i++;
		createObject(i,1004,110,202,130,'platform');
		i++;
		createObject(i,1146,50,30,30,'lifePiece');
		i++;
		createObject(i,1608,303,200,330,'platform');
		i++;
		createObject(i,1808,0,200,1600,'platform');
		i++;
		createObject(i,1308,303,240,100,'platform');
		i++;
		createObject(i,1248,403,97,60,'enemy',6,300,'horizontal');
		i++;
		createObject(i,1398,403,60,60,'goal');
		i++;
		createObject(i,80,318,30,30,'lifePiece');
						$('.platform, .platform1, .goal').remove(); /*	For level creation	*/

	}

	if (number == 4){
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
		createObject(i,750,443,97,60,'enemy',5,200,'horizontal');	
		i++;
		createObject(i,500,443,97,60,'enemy',2,50,'horizontal');	
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
	$('.currentBG').fadeIn();
	if (level != 1){
		$('#player').fadeIn();
	}
}

function startGame(){
    beginning = 0;
    createLevel(1);
    startLevel();

    rocketX = -100;
    rocketY =100;
    $('#rocket').fadeIn();

    earthquake = 1;

    lives = 3;
    lifePieces = 0;

    beginningLoop = setInterval(function(){
        if (beginning <= 20){
            $('#rocket').css('top',rocketY);
            $('#rocket').css('left',rocketX);
            rocketY +=18;
            rocketX += 6;
        }


        if (beginning == 40){
            $('#player').fadeIn();
        }

        if (beginning <= 43 && beginning >= 20){
            earthquakeTime();
        }

        if (beginning > 50){
            playerPositionX += playerSpeed;
            $('#player').addClass( "walk" );
        }
        
        drawGame();
        beginning++;

        if (beginning == 70){
            clearInterval(beginningLoop);
            mainLoop();
        }
    },1000/20);
}

$(function (){
    startGame();
});

