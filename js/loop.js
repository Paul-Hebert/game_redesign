//  Update 
    function updateGame(){
        if (dying == false && lives != 0){
            collisionTest('player',playerWidth,playerHeight,overallPositionX,playerPositionY);
            setSprites();
            jump();
            moveEnemies();
            $('#player').removeClass( "walk" );
            if (instructionNumber < instructionTotal){
                instructions();
            }
            if (userInput != true){
                if (map[68] || map[39]){
                    playerDirection = 'right';
                    horizontal(-playerSpeed);
                }
                if (map[65] || map[37]){
                    playerDirection = 'left';
                    horizontal(playerSpeed);
                }
                if (map[87] || map[38]){
                    if (collisionTop == true && jumping == 0){
                        jumping = 1;
                    }
                }
            }

        } else{
            die();
        }
        return false;
    }

//  draw
    function drawGame(){

        background.style.webkitTransform= "translate(" + backPositionX + "px," + backPositionY + "px)";
        parallax.style.webkitTransform= "translate(" + parallaxPositionX + "px)";

        player.style.webkitTransform= "translate(" + (playerPositionX - backPositionX)+ "px," + (playerPositionY - playerHeight) + "px)";
        
        background.style.MozTransform= "translate(" + backPositionX + "px," + backPositionY + "px)";
        parallax.style.MozTransform= "translate(" + parallaxPositionX + "px)";

        player.style.MozTransform= "translate(" + (playerPositionX - backPositionX)+ "px," + (playerPositionY - playerHeight) + "px)";
        
        lifePieceRotation += 2;

        for(i = 0; i < obstacleNumber; i++){
            if (platforms[i].movementSpeed != null){
                $('#platform' + i + '').css('left', platforms[i].xVal+ 'px');
                $('#platform' + i + '').css('top', platforms[i].yVal+ 'px'); 
            }
            if (platforms[i].type == "lifePiece"){
                document.getElementById('platform' + i).style.MozTransform= "rotate(" + lifePieceRotation + "deg)";
            }
        }
        return false;
    }

//  Game Loop
function mainLoop() {
    setInterval( function(){
        updateGame();
        if (updated){
        	drawGame();
    	}
    	updated = false;
        return false;
    },1000/20);
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
    },1000/30);
}

$(function (){
    startGame();
});


