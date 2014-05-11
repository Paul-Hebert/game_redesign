//  Update 
    function updateGame(){
        collisionTest();
        jump();
        if (instructionNumber <= instructionTotal){
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
    }

//  draw
    function drawGame(){
        $( '#background' ).css('left',backPositionX + 'px');
        $( '#background' ).css('top',backPositionY + 'px');
    	$( '#player' ).css('left',playerPositionX + 'px');
    	$( '#player' ).css('top',playerPositionY - 60 + 'px');
        for(i = 0; i < obstacleNumber; i++){
            if (platforms[i].type == 'enemy'){
                $('#platform' + i +'').css('left', platforms[i].xVal+ 'px');
                $('#platform' + i +'').css('top', platforms[i].yVal+ 'px'); 
            }
        }
    }

//  Game Loop
    var mainloop = function() {
        updateGame();
        if (updated){
        	drawGame();
    	}
    	updated = false;
    };

//  Initiate and run Game loop.
    var ONE_FRAME_TIME = 1000.0 / 60.0 ;
    intervalId = setInterval( mainloop, ONE_FRAME_TIME );

