var map = {68: false, 65: false, 87: false};
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        userInput = false;
    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});



 function horizontal(speed){
    //  If we're not past the left edge and not past the right edge check the player's position.
    if(backPositionX <= 0 && backPositionX >= screenWidth - backWidth){
        //  If the player's in the middle move the map.
        if ((playerPositionX == (screenWidth/2)-30)){
            backPositionX += speed;
            // If the map is past the left edge, move the map to the left edge, and move the player instead.
            if(backPositionX > 0){
                backPositionX = 0;
                movePlayer(speed);
            }
            // If the map is past the right edge, move the map to the right edge, and move the player instead.
            if(backPositionX < screenWidth - backWidth){
                backPositionX = screenWidth - backWidth;
                playerPositionX -= speed;
            }
        //  Otherwise, move the player.
        } else{
            movePlayer('horizontal',speed);
        }
    }
    updated = true;
 }

 function movePlayer(direction,speed){
    if (direction == 'horizontal'){
        //  If the player is not past the left efge and not past the right edge, move the player.
        if (playerPositionX >= 0 && playerPositionX <= screenWidth - 60){
            playerPositionX -= speed;
        }
    }
     if (direction == 'vertical'){
        //  If the player is not past the left efge and not past the right edge, move the player.
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
            //  If collided platform is the goal, win the game.
            if (platforms[i].type=="goal"){
                alert('TaDa!');
                window.location="index.html";
            }
        }

    }
    //  If there is no collision, gravity sets in.
    if (collision == false){
        gravity();
    }
 }

 function gravity(){
    playerPositionY++;
    updated = true;
 }

 function jump(){
    movePlayer('vertical',3);
 }