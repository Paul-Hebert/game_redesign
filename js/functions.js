//****************************************************************************************//
//  Input control   //
//****************************************************************************************//

//  Create an array to hold keycodes

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
    moving = true;
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
    }
   // runSprites(speed);

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
        return false;    
    }
    //  If the player's past the right edge, move it to the right edge.
    if (playerPositionX > screenWidth - playerWidth){
        playerPositionX = screenWidth - (playerWidth + 1);
        return false;
    }
    return false;
 }

function collisionTest(identifier,mainWidth,mainHeight,mainX,mainY){
    //  Reset collision to default false.
    if (identifier == 'player'){
        collision = false;
        collisionTop = false;
        collisionBottom = false;
        collisionLeft = false;
        collisionRight = false;
    }

    //  Iterate through platforms, setting their values to be used for collisionTesting
    for(i = 0; i < obstacleNumber; i++){
        if (identifier != i){
            // Set values
            xVal = platforms[i].xVal;
            xVal2 = platforms[i].xVal + platforms[i].widthVal;
            yVal = platforms[i].yVal;
            yVal2 = platforms[i].yVal + platforms[i].heightVal;

            //  Set mainX based on players position on the screen and the background's position on the screen.
            if (identifier == 'player'){    
                mainX = playerPositionX - backPositionX;
                specificCollisionBottom = false;
            }
            specificCollisionTop = false;


            //  Test for collisions. If true, set collision to true.
            if (mainY >= yVal-2 && mainY <= yVal2 + mainHeight && mainX >= xVal - mainWidth && mainX <= xVal2){
                if (identifier == 'player'){  
                    collision = true;
                }
                //Check to see if the collision is with the top border.
                if (mainY - 20 < yVal && platforms[i].type != 'lifePiece'){
                    specificCollisionTop = true;
                    if (identifier == 'player'){
                        collisionTop = true;
                        playerPositionY = yVal; 
                    }
                } else if(mainY - 20 > yVal2 && platforms[i].type != 'lifePiece'){
                    if (identifier == 'player'){
                        collisionBottom = true;
                        specificCollisionBottom = true;
                        if (platforms[i].type == "platform"){
                            jumping = 0;
                        }
                    }
                }
                else if(platforms[i].type == "platform"){
                    //If not, check sides.
                    if (platforms[i].type != 'goal'){
                        // Check left hand collision
                        if (mainX < xVal2 && mainX + mainWidth > xVal2){
                            if (identifier == 'player'){
                                collisionLeft = true;
                            }
                        }
                        // Check right hand collision
                        if (mainX + mainWidth > xVal && mainX < xVal){
                            if (identifier == 'player'){
                                collisionRight = true;
                            }
                        }

                    }
                }

                //  If collided platform is the goal, win the game.
                if (platforms[i].dying == false){
                    if (platforms[i].type=="goal"){
                        if (identifier == 'player'){
                            win();
                        }
                    //  Life pieces
                    } else if (platforms[i].type == "lifePiece"){
                        if (identifier == 'player'){
                            platforms[i].dying = true;
                            $('#platform' + i + '').fadeOut();
                            lifePieces++;
                            input = document.createElement('div');
                            input.className = 'lifePieceSymbol';
                            document.getElementById('lifePieces').appendChild(input);

                            if (lifePieces == 3){
                                $('.lifePieceSymbol').remove();
                                lifePieces = 0;
                                createLife(1);
                            }
                        }
                    //  If collided platform is an enemy, kill or be killed.

                    } else if (platforms[i].type == "enemy"){
                        if (identifier == 'player'){
                            if (specificCollisionTop == true){
                                if (jumping == 0){
                                    platforms[i].dying = true;
                                    jumping = 1;
                                    enemyJump = true;
                                }
                            } else{
                                lose();
                            }
                        }
                    } else if (platforms[i].type =="enemy1"){
                        if (identifier == 'player'){
                            lose();
                        }
                    } else if (platforms[i].type =="spike"){
                        if (identifier == 'player'){
                            lose();
                        } else if (platforms[identifier].type == 'enemy'){
                            platforms[identifier].dying = true;
                        }
                    } else if (platforms[i].type =="spike1" && specificCollisionBottom == true){
                        if (identifier == 'player'){
                            lose();
                        }
                    } else if (platforms[i].type == "button"){
                        if (identifier == 'player'){
                            platforms[i].movementSpeed = 3;
                        }
                    } else if (platforms[i].type == "pitcher" && specificCollisionTop == true){
                        jumping = -40;
                        enemyJump = true;
                    }
                }
            }
        }
        if (identifier == 'player'){
            if (platforms[i].type == 'button' && platforms[i].pressed == true && specificCollisionTop == false){
                platforms[i].movementSpeed = -3;
            }
        }


    }
    if (identifier == 'player'){
        if (mainY > screenHeight){
            lose();
        }

        //  If there is no collision with the top border, gravity sets in.
        if (collisionTop == false && jumping == 0){
            gravity('player');
        } 
        //  Otherwise, reset gravityVal
        else{
            gravityVal = 1;
        }
    }

 }

function moveEnemies(){
            // Move enemies
    for(z = 0; z < obstacleNumber; z++){

        xVal = platforms[z].xVal;
        xVal2 = platforms[z].xVal + platforms[z].widthVal;
        yVal = platforms[z].yVal;
        yVal2 = platforms[z].yVal + platforms[z].heightVal;
        
        if (platforms[z].movementSpeed != null){
            //  If not dying, walk.
            if (platforms[z].dying == false){
                if (platforms[z].direction == 'horizontal'){
                    platforms[z].xVal += platforms[z].movementSpeed;
                } else{
                    platforms[z].yVal += platforms[z].movementSpeed;  
                }
                platforms[z].movementTotal += platforms[z].movementSpeed;
                //  If enemy is at end of range turn around.
                if (platforms[z].movementTotal >= platforms[z].movementRange || platforms[z].movementTotal <= -platforms[z].movementRange){
                    if (platforms[z].type == 'button'){
                        platforms[z].movementSpeed = 0;
                        if (platforms[z].movementTotal >= platforms[z].movementRange){
                            platforms[z].pressed = true;
                            buttonPress(z,'press');
                        } else if (platforms[z].movementTotal <= -platforms[z].movementRange){
                            platforms[z].pressed = false;
                            buttonPress(z,'release');
                        }
                    } else{
                        platforms[z].movementSpeed *= -1;
                    }
                    platforms[z].movementTotal = 0;
                }
            //If the enemy's dying and on the map, drop.
            } else if(platforms[z].yVal < screenHeight){
                gravity(z);
            }
            if (platforms[z].type == 'enemy'){
                collisionTest(z,platforms[z].widthVal,platforms[z].heightVal,xVal,yVal2-10);
                if (platforms[z].movementSpeed > 0){
                    $('#platform' + z).addClass('enemyRight').removeClass('enemyLeft');
                } else{
                    $('#platform' + z).addClass('enemyLeft').removeClass('enemyRight');
                }
            }
        }
    }
}

function setSprites(){
    $('#player').removeClass( "stillRight" );  
    $('#player').removeClass( "spriteLeft" ); 
    $('#player').removeClass( "spriteRight" );  
    $('#player').removeClass("jumpLeft");
    $('#player').removeClass("jumpRight"); 
    if (jumping != 0 && enemyJump == false){
        if (playerDirection == 'right'){
            $('#player').addClass("jumpRight");
        } else{
            $('#player').addClass("jumpLeft");
        }
    } else if (jumping == 0 && collisionTop == true && moving == true){
        if (playerDirection == 'right'){
            $('#player').addClass( "spriteRight" );
        } else if (playerDirection == 'left'){
            $('#player').addClass( "spriteLeft" );   
        }
    } else if(playerDirection == 'right'){
        $('#player').addClass( "stillRight" )       
    }
    moving = false;
}

//****************************************************************************************//
//  Physics   //
//****************************************************************************************//


 function gravity(identifier){
    //  Gravity acts on player.
    if (identifier == 'player'){
        playerPositionY += gravityVal;
        gravityVal += gravityChange;
        if (gravityVal > 20){
            gravityVal = 20;
        }
    } else{
        platforms[identifier].yVal += platforms[identifier].gravityVal;
        platforms[identifier].gravityVal += gravityChange;
        if (platforms[identifier].gravityVal > 20){
            platforms[identifier].gravityVal = 20;
        }
    }
    return false;
 }

 function jump(){
    //  If there's a jump in progress, the player goes up.
    if (jumping != 0){
 
        // Put player in front of front layer.
        $('#player').css('z-index',5);
        movePlayer('vertical',jumpVal); 
        jumping++; 
        //  Reset jump variable when the jump is finished.
        if (jumping == jumpLength){
            jumping = 0;
            enemyJump = false;
        }     
    } else{
        //  Put player behind front layer if landed.
        if (collisionTop == true){
            $('#player').css('z-index',1);
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
    if (dying == false){
        $('.life:last-of-type').remove();
        lives--;
        dying = true;
        $('#player').css('z-index',10);
    }
    return false;
}

function die(){
    gravity('player');
    if (playerPositionY > screenHeight + 100){
        if (lives <= 0){   
            playerPositionY = -3000;
            playerPositionX = -3000;
            changeInstruction('<h1>Game Over!</h1><h1 class="cursor" onclick="replay();">Play again?</h1>');
            lifePieces = 0;
            $('.lifePieceSymbol').remove();
        } else{
            createLevel(level);
        }
        dying = false;
    }
}

function replay(){
    createLife(3);
    createLevel(1);
    playerPositionX = 200;
}

function createLife(num){
    for (lifeNum = 0; lifeNum < num; lifeNum++){
        input = document.createElement('div');
        input.className = 'life';
        document.getElementById('lives').appendChild(input);
        lives++;
    }
}

//****************************************************************************************//
//  Buttons   //
//****************************************************************************************//
    function buttonPress(i,direction){
        if (level == 3){
            if (i == 8){
                if (direction == 'press'){
                    if (platforms[16].movementSpeed == 0){
                        platforms[10].movementSpeed = -1.5;
                        platforms[11].movementSpeed = 1.5;
                        platforms[16].movementSpeed = 4;
                    }
                }
                if (direction == 'release'){
                }
            }
        }
    }


//****************************************************************************************//
//  Instructions   //
//****************************************************************************************//


function instructions(){
    // Level 1 instructions, based off of key input.
    if (level == 1){
        if (instructionNumber == 0){
            $('#instructions').fadeIn();
            instructionNumber++;
        }

        if (map[68] == true || map[65] == true || map[39] == true || map[37] == true){
            if (instructionNumber == 1){
                changeInstruction('<h1>Use <span class="key">W</span> to jump onto platforms.</h1>');
            }    
        }
        if (map[87] == true || map[38] == true){
            if (instructionNumber == 2){
                changeInstruction('<h1>Move to the <img src="imgs/goal.png" id="goalText"/> to complete the level.</h1>');
                $("#instructions").delay(3000).fadeOut(1000);
            }    
        }
    }
    if (level == 2){
        if (instructionNumber == 0){
            $("#instructions").fadeIn();
            instructionNumber ++;       
        }
        if (instructionNumber == 1){
            if (platforms[4].dying == true || platforms[7].dying == true ||platforms[17].dying == true ||platforms[18].dying == true ||platforms[19].dying == true){
                changeInstruction('<h1> Collect 3 <img src="imgs/lifePiece.png" id="goalText"/>s to gain a life.</h1>');
            }
        }
        if (instructionNumber == 2){
            if(lifePieces > 0){
                changeInstruction('');
            }
        }
    }
    return false;
}

function changeInstruction(message){
        // Fade instructions in and out. Change text in between.
        $('#instructions').fadeOut()
        window.setTimeout(function () {
            $("#instructions").html(message);
            $("#instructions").fadeIn();
        }, 500);
        instructionNumber ++;
}

//****************************************************************************************//
//  Cut Scenes and Bullhonkey  //
//****************************************************************************************//


function earthquakeTime(){
            if (earthquake == 5){
                earthquake = 1;
            }
            if (earthquake == 1){
                backPositionX += 1.5;
                backPositionY += 1.5;
            }
            if (earthquake == 2){
                backPositionX += 1.5;
                backPositionY -= 1.5;
            }
            if (earthquake == 3){
                backPositionX -= 1.5;
                backPositionY -= 1.5;
            }
            if (earthquake == 4){
                backPositionX -= 1.5;
                backPositionY += 1.5;
            }
            earthquake++
        }
