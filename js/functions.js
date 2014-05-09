//****************************************************************************************//
//  Input control   //
//****************************************************************************************//

//  Create an array to hold keycodes
var map = {68: false, 65: false, 87: false};

//  Set down keys to true;
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        userInput = false;
    } //  Reset keys on keyUp.
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});

//****************************************************************************************//
//  Movement functions   //
//****************************************************************************************//


 function horizontal(speed){
    //  If we're not past the left edge and not past the right edge check the player's position.
    if(backPositionX <= 0 && backPositionX >= screenWidth - backWidth){
        //  If the player's in the middle move the map.
        if ((playerPositionX == (screenWidth/2)-30)){
            backPositionX += speed;
            // If the map is past the left edge, move the map to the left edge, and move the player instead.
            if(backPositionX > 0){
                backPositionX = 0;
                movePlayer('horizontal',speed);
            }
            // If the map is past the right edge, move the map to the right edge, and move the player instead.
            if(backPositionX < screenWidth - backWidth){
                backPositionX = screenWidth - backWidth;
                movePlayer('horizontal',speed);
            }
        //  Otherwise, move the player.
        } else{
            movePlayer('horizontal',speed);
        }
    } else{
        movePlayer('horizontal',speed);
    }
    updated = true;
 }

 function movePlayer(direction,speed){
    if (direction == 'horizontal'){
        //  If the player is not past the left edge and not past the right edge, move the player.
        if (playerPositionX >= 0 && playerPositionX <= screenWidth - 60){
            playerPositionX -= speed;
        }
    }
     if (direction == 'vertical'){
        //  If the player is not past the left edge and not past the right edge, move the player.
        if (playerPositionY >= 0 && playerPositionY <= screenHeight){
            playerPositionY -= speed;

        }
    }   
    //  If the player's past the left edge, move it to the left edge.
    if (playerPositionX < 1){
        playerPositionX = 2;
    }
    //  If the player's past the right edge, move it to the left edge.
    if (playerPositionX > screenWidth - 60){
        playerPositionX = screenWidth - 61;
    }
 }

 function collisionTest(identifier){
    //  Reset collision to default false.
    collision = false;
    collisionTop = false;
    //  Iterate through platforms, setting their values to be used for collisionTesting
    for(i = 0; i < obstacleNumber; i++){
        xVal=platforms[i].xVal;
        xVal2=platforms[i].xVal+platforms[i].widthVal;
        yVal=platforms[i].yVal;
        yVal2=platforms[i].yVal+platforms[i].heightVal;

        //  Set overallPositionX based on players position on the screen and the background's position on the screen.
        overallPositionX = playerPositionX - backPositionX;

        //  Test for collisions. If true, set collision to true.
        if (playerPositionY >= yVal-2 && playerPositionY <= yVal2 + 60 && overallPositionX >= xVal - 60 && overallPositionX <= xVal2){
            collision = true;
            //Check to see if the collision is with the top border.
            if (playerPositionY - 60 < yVal){
                collisionTop = true;
            }
            //  If collided platform is the goal, win the game.
            if (platforms[i].type=="goal"){
                alert('TaDa!');
                window.location="index.html";
            }
        }

    }

    if (playerPositionY > screenHeight){
        alert('Womp Womp Womp');
        window.location="index.html";
    }

    //  If there is no collision with the top border, gravity sets in.
    if (collisionTop == false && jumping == 0){
        gravity();
    } 
    //  Otherwise, reset gravityVal
    else{
        gravityVal = 1;
    }
 }

//****************************************************************************************//
//  Physics   //
//****************************************************************************************//


 function gravity(){
    //  Gravitational acceleration
    gravityVal += gravityChange;
    //  Gravity acts on player.
    playerPositionY += gravityVal;
    updated = true;
 }

 function jump(){
    //  If there's a jump in progress, the player goes up.
    if (jumping != 0){
    // Put player in front of front layer.
    $('.front').css('z-index',0);
    movePlayer('vertical',jumpVal); 
    jumping++; 
        //  Reset jump variable when the jump is finished.
        if (jumping == jumpLength){
            jumping = 0;
        }     
        updated = true
    } else{
        //  Put player behind front layer if landed.
        if (collisionTop == true){
            $('.front').css('z-index',5);
        }
    }
 }

//****************************************************************************************//
//  Instructions   //
//****************************************************************************************//


function instructions(){
    if (instructionNumber == 0 && level == 1){
        $('#instructions').delay(500).fadeIn(500);
        instructionNumber++
    }

    if (map[68] == true || map[65] == true){
        if (level == 1 && instructionNumber == 1){
            changeInstruction('<h1>Use <span class="key">W</span> to jump onto platforms.</h1>');
        }    
    }
    if (map[87] == true){
        if (level == 1 && instructionNumber == 2){
            changeInstruction('<h1>Move to the <img src="imgs/goal.png" id="goalText"/> to complete the level.</h1>');
            $("#instructions").delay(3000).fadeOut(1000);
        }    
    }
}

function changeInstruction(message){
            $('#instructions').delay(500).fadeOut(500).delay(500).fadeIn(500);
            window.setTimeout(function () {
                $("#instructions").html(message);
            }, 1000);
            instructionNumber ++;
}