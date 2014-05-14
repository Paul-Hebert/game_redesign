//  Update 
    function updateGame(){
        collisionTest('player',playerWidth,playerHeight);
        jump();
        $('#player').removeClass( "walk" );
        if (instructionNumber < instructionTotal){
            instructions();
        }
        if (userInput != true){
            if (map[68]){
                horizontal(-playerSpeed);
            }
            if (map[65]){
                horizontal(playerSpeed);
            }
            if (map[87]){
                if (collisionTop == true && jumping == 0){
                    jumping = 1;
                }
            }
        }
        return false;
    }

//  draw
    function drawGame(){

        background.style.webkitTransform= "translate(" + backPositionX + "px," + backPositionY + "px)";
        player.style.webkitTransform= "translate(" + (playerPositionX - backPositionX)+ "px," + (playerPositionY - playerHeight) + "px)";
        
        for(i = 0; i < obstacleNumber; i++){
            if (platforms[i].movementSpeed != null){
                $('#platform' + i +'').css('left', platforms[i].xVal+ 'px');
                $('#platform' + i +'').css('top', platforms[i].yVal+ 'px'); 
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
    createLevel(1);
    startLevel();

    rocketX = -100;
    rocketY =100;
    $('#rocket').fadeIn();

    earthquake = 1;

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


