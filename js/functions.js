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
    return false;
});

//****************************************************************************************//
//  Movement functions   //
//****************************************************************************************//


 function horizontal(speed){
    colliding = false;
    if (speed > 0 && collisionLeft == true){
        colliding = true;
    } else if (speed < 0 && collisionRight == true){
        colliding = true;
    }
    if (colliding == false){
        //  If we're not past the left edge and not past the right edge check the player's position.
        if(backPositionX <= 0 && backPositionX >= screenWidth - backWidth){
            //  If the player's in the middle move the map.
            if ((playerPositionX <= (screenWidth/2)-25)&&(playerPositionX >= (screenWidth/2)-35)){
                backPositionX += speed;
                parallaxPositionX -= speed * .5;
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
    return false;
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
    return false;
 }

 function collisionTest(identifier){
    //  Reset collision to default false.
    collision = false;
    collisionTop = false;
    collisionLeft = false;
    collisionRight = false;

    //  Iterate through platforms, setting their values to be used for collisionTesting
    for(i = 0; i < obstacleNumber; i++){
        // Set values
        xVal = platforms[i].xVal;
        xVal2 = platforms[i].xVal + platforms[i].widthVal;
        yVal = platforms[i].yVal;
        yVal2 = platforms[i].yVal + platforms[i].heightVal;

        //  Set overallPositionX based on players position on the screen and the background's position on the screen.
        overallPositionX = playerPositionX - backPositionX;

        //  Test for collisions. If true, set collision to true.
        if (playerPositionY >= yVal-2 && playerPositionY <= yVal2 + 60 && overallPositionX >= xVal - 60 && overallPositionX <= xVal2){
            specificCollisionTop = false;
            collision = true;

            //Check to see if the collision is with the top border.
            if (playerPositionY - 20 < yVal && platforms[i].type != 'lifePiece'){
                specificCollisionTop = true;
                collisionTop = true;
            } else if(platforms[i].type == "platform"){
                //If not, check sides.
                if (platforms[i].type != 'goal'){
                    // Check left hand collision
                    if (overallPositionX < xVal2 && overallPositionX + 60 > xVal2){
                        collisionLeft = true;
                    }
                    // Check right hand collision
                    if (overallPositionX + 60 > xVal && overallPositionX < xVal){
                        collisionRight = true;
                    }
                }
            }

            //  If collided platform is the goal, win the game.
            if (platforms[i].type=="goal"){
                win();
            //  If collided platform is an enemy, kill or be killed.
            } else if (platforms[i].type == "lifePiece" && platforms[i].dying == false){
                platforms[i].dying = true;
                $('#platform' + i + '').fadeOut();
                lifePieces++;
                    input = document.createElement('div');
                    input.className = 'lifePieceSymbol';
                    document.getElementById('lifePieces').appendChild(input);

                if (lifePieces == 3){
                    $('.lifePieceSymbol').remove();
                    lifePieces = 0;
                    lives ++;
                    input = document.createElement('div');
                    input.className = 'life';
                    document.getElementById('lives').appendChild(input);
                }
            } else if (platforms[i].type == "enemy" && platforms[i].dying == false){
                if (specificCollisionTop == true){
                    if (jumping == 0){
                        platforms[i].dying = true;
                        jumping = 1;
                    }
                } else{
                    lose();
                }
            }
        }

        // Move enemies
        if (platforms[i].movementSpeed != null){
            //  If not dying, walk.
            if (platforms[i].dying == false){
                platforms[i].xVal += platforms[i].movementSpeed;
                platforms[i].movementTotal += platforms[i].movementSpeed;
         /* Moves player if collision is true in genral.d
                if (platforms[i].type == 'platform' && specificCollisionTop == true){
                    playerPositionX  += platforms[i].movementSpeed;
                }*/
                //  If enemy is at end of range turn around.
                if (platforms[i].movementTotal >= platforms[i].movementRange || platforms[i].movementTotal <= -platforms[i].movementRange){
                    platforms[i].movementTotal = 0;
                    platforms[i].movementSpeed *= -1;
                }
            //If the enemy's dying and on the map, drop.
            } else if(platforms[i].yVal < screenHeight){
                platforms[i].yVal += 3;
            }
            updated = true;
        }
    }

    if (playerPositionY > screenHeight){
        lose();
    }

    //  If there is no collision with the top border, gravity sets in.
    if (collisionTop == false && jumping == 0){
        gravity();
    } 
    //  Otherwise, reset gravityVal
    else{
        gravityVal = 1;
    }

    return false;
 }

//****************************************************************************************//
//  Physics   //
//****************************************************************************************//


 function gravity(){
    //  Gravitational acceleration
    gravityVal += gravityChange;
    if (gravityVal > 9){
        gravityVal = 9;
    }
    //  Gravity acts on player.
    playerPositionY += gravityVal;
    updated = true;
    return false;
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
    return false;
 }

//****************************************************************************************//
//  Winning and Losing  //
//****************************************************************************************//

function win(){
    level++;
    createLevel(level);
    return false;
}

function lose(){
    $('.life:last-of-type').remove();
    lives--;
    if (lives == 0){   
        $('#player').remove();
        changeInstruction('<h1>Game Over!</h1>');
    } else{
        createLevel(level);
    }
    return false;
}

//****************************************************************************************//
//  Instructions   //
//****************************************************************************************//


function instructions(){
    // Level 1 instructions, based off of key input.
    if (level == 1){
        if (instructionNumber == 0){
            $('#instructions').delay(500).fadeIn(500);
            instructionNumber++;
        }

        if (map[68] == true || map[65] == true){
            if (instructionNumber == 1){
                changeInstruction('<h1>Use <span class="key">W</span> to jump onto platforms.</h1>');
            }    
        }
        if (map[87] == true){
            if (instructionNumber == 2){
                changeInstruction('<h1>Move to the <img src="imgs/goal.png" id="goalText"/> to complete the level.</h1>');
                $("#instructions").delay(3000).fadeOut(1000);
            }    
        }
    }
    if (level ==2){
        if (instructionNumber == 0){
            $("#instructions").delay(3000).fadeOut(1000);
            instructionNumber++;
            changeInstruction('<h1>Collect 3 blue life pieces to gain a life.</h1>');
            $("#instructions").delay(3000).fadeOut(1000);
        }
    }
    return false;
}

function changeInstruction(message){
            // Fade instructions in and out. Change text in between.
            $('#instructions').delay(500).fadeOut(500).delay(500).fadeIn(500);
            window.setTimeout(function () {
                $("#instructions").html(message);
            }, 1000);
            instructionNumber ++;
    return false;

}