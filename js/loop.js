//  Update 
    function updateGame(){
        collisionTest();
        if (userInput != true){
            if (map[68]){
                horizontal(-3);
            }
            if (map[65]){
                horizontal(3);
            }
            if (map[87]){
                jump();
            }
        }
    }

//  draw
    function drawGame(){
        $( '#background' ).css('left',backPositionX + 'px');
        $( '#background' ).css('top',backPositionY + 'px');
    	$( '#player' ).css('left',playerPositionX + 'px');
    	$( '#player' ).css('top',playerPositionY - 60 + 'px');
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

