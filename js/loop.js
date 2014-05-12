//  Update 
    function updateGame(){
        collisionTest();
        jump();
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
    }

//  draw
    function drawGame(){
        document.getElementById('background').style.webkitTransform= "translate(" + backPositionX + "px)";
        $( '.parallax' ).css('left',parallaxPositionX + 'px');
    	$( '#player' ).css('left',playerPositionX + 'px');
    	$( '#player' ).css('top',playerPositionY - 60 + 'px');
        for(i = 0; i < obstacleNumber; i++){
            if (platforms[i].movementSpeed != null){
                $('#platform' + i +'').css('left', platforms[i].xVal+ 'px');
                $('#platform' + i +'').css('top', platforms[i].yVal+ 'px'); 
            }
        }
    }

//  Game Loop
function mainLoop() {
    requestAnimationFrame(mainLoop);
        updateGame();
        if (updated){
        	drawGame();
    	}
    	updated = false;
    };

$(function(){
    mainLoop();
});


//****************************************************************************************//
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
//****************************************************************************************//
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
     
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
     
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());
//****************************************************************************************//
//****************************************************************************************//
