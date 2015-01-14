window.onload = function()
{
   
        

         var resizeTimeout;
         var canvas = document.getElementById('canvas');
        //get screen;
        var maxcountw = 600//Math.ceil((window.innerWidth/10) * 10)-40 ;
        var maxcounth = 600//Math.ceil((window.innerHeight/10) * 10)-20 ;

        if(window.innerWidth<1000){
            var maxcountw = 400//Math.ceil((window.innerWidth/10) * 10)-40 ;
            var maxcounth = 400//Math.ceil((window.innerHeight/10) * 10)-20 ;
        }
        if(window.innerWidth<300){
            var maxcountw = 300//Math.ceil((window.innerWidth/10) * 10)-40 ;
            var maxcounth = 300//Math.ceil((window.innerHeight/10) * 10)-20 ;
        }
        if(window.innerWidth<200){
            var maxcountw = 200//Math.ceil((window.innerWidth/10) * 10)-40 ;
            var maxcounth = 200//Math.ceil((window.innerHeight/10) * 10)-20 ;
        }

        var gameSound = document.getElementById("music"),
        gameoverSound = document.getElementById("gameover"),
        eatSound = document.getElementById("eat");

        var files = [gameSound, gameoverSound, eatSound];

       // alert(maxcountw+" "+maxcounth)
        var fontlink = "https://www.google.com/fonts#UsePlace:use/Collection:Oswald";
        ctx = canvas.getContext('2d'),
        score = 0,
        isrun = true;
        direction = 0,
        snake = new Array(3),
        active = true,
        counter = 1,
        level = 1,
        rungame = undefined,
        inistart = 17,
        starttimeframe =inistart,
        maxmatrixnum = Math.ceil((maxcountw/20)*20)/20;
        var cornerRadius = 50;
       // alert(maxmatrixnum);

        stopgame = false,
        click = false,
        randomgridpos = maxmatrixnum/2;

        var gameGrid = new Array(maxmatrixnum);
        for (var i = 0; i < gameGrid.length; i++) {
            gameGrid[i] = new Array(maxmatrixnum);
        }
        canvas.width = maxcountw;
        canvas.height = maxcounth;
        
        gameGrid = makeSnake(gameGrid);
        gameGrid = foodRandom(gameGrid);

        game();

        gameSound.currentTime = 0;
        gameSound.play();
   

    function reset(){   
                click = true;
        //reset?
       if(active==false){
        active=true;
       }
       if(click){
        click=false
       }
       isrun=true;
       score = 0;
        direction = 0;
        counter = 1,
        level = 1,
        starttimeframe =inistart,
       snake = new Array(3),
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.fillStyle = 'black';
       gameoverSound.pause();
        gameSound.currentTime = 0;
        gameSound.play();
      // 
       //gameGrid.length = 0;
      
       isrun=true;
       gameGrid = new Array(maxmatrixnum);
        for (var i = 0; i < gameGrid.length; i++) {
            gameGrid[i] = new Array(maxmatrixnum);
        }
       // window.requestAnimationFrame(animate);
       // 
        gameGrid = makeSnake(gameGrid);
        gameGrid = foodRandom(gameGrid);
        game();
        rungame = window.requestAnimationFrame(animate);
        //animate();
        
       
    }
  //  window.addEventListener("resize",delayresize,false);
    function resizedelay() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        resize();
     
       // The actualResizeHandler will execute at a rate of 15fps
       }, 66);
    }
  }

    canvas.onmousedown = function(e){
        reset();

    }

    function makeSnake(gameGrid)
    {
    
        
        var rndX = Math.round(Math.random() * randomgridpos),
            rndY = Math.round(Math.random() * randomgridpos);
        while ((rndX - snake.length) < 0) {
            rndX = Math.round(Math.random() * randomgridpos);
        }
       for (var i = 0; i < snake.length; i++) {
            snake[i] = { x: rndX - i, y: rndY };
            gameGrid[rndX - i][rndY] = 2;
        }

        return gameGrid;
    }
    function foodRandom(gameGrid)
    {
        
        var rndX = Math.round(Math.random() * randomgridpos),
            rndY = Math.round(Math.random() * randomgridpos);
        
        while (gameGrid[rndX][rndY] === 2) {
            rndX = Math.round(Math.random() * randomgridpos);
            rndY = Math.round(Math.random() * randomgridpos);
        }
        
        gameGrid[rndX][rndY] = 1;

        return gameGrid;
    }
    

    function animate(){
        
        if(isrun==false){
            gameSound.pause();
        }

        if(isrun){
            ++counter;
            
            //alert(counter)
            if(counter==(starttimeframe-level)){
               if(active){
                game();
                counter=1;
              
                }
            }else{
                if(active){
                    //alert('2')
                    window.cancelAnimationFrame(rungame);
                    rungame = window.requestAnimationFrame(animate);
                }
            }
        }else{
            //alert('ding');
            window.cancelAnimationFrame(rungame);
            isrun=true
        }
       
        //isrun=true;//prevent speeding up everytime we reset
        
    }


    function uiText() 
    {
        ctx.lineWidth = 2; 
        ctx.strokeStyle = 'white'; 
        //ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);
       ctx.fillStyle = 'white';
        ctx.font = '20px "arcade"';
        //ctx.fillText('Score: ' + score+" "+level+"  starttimeframe: "+starttimeframe+" Counter: "+counter+" rungame: "+rungame,2,12) 
        ctx.fillText('Score: ' + score,10,20) 
    }

    



    function gameOverScreen()
    {
        
        active = false;//stop the game

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '50px "arcade"';
        ctx.fillText('Game Over', ((canvas.width / 2) - (ctx.measureText('Game Over!').width / 2)), maxcounth/2);
        ctx.font = '20px "arcade"';
        eatSound.pause();
        gameSound.pause();
        gameoverSound.currentTime = 0;
        gameoverSound.play();

    }
    

function game() 
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (var i = snake.length - 1; i >= 0; i--) {

            if (i === 0) {
                switch(direction) {
                    case 0: // Right
                        snake[0] = { x: snake[0].x + 1, y: snake[0].y }
                        break;
                    case 1: // Left
                        snake[0] = { x: snake[0].x - 1, y: snake[0].y }
                        break;
                    case 2: // Up
                        snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
                        break;
                    case 3: // Down
                        snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
                        break;
                }
                if (snake[0].x < 0 || 
                    snake[0].x >= maxmatrixnum ||
                    snake[0].y < 0 ||
                    snake[0].y >= maxmatrixnum) {
                    gameOverScreen();
                    return;
                }
                if (gameGrid[snake[0].x][snake[0].y] === 1) {
                    score += 10;
                    //add game sound event here
                     eatSound.pause();
                     eatSound.currentTime=0;
                     eatSound.play();
                    ++level;
                    if(level>11){
                        level=11;
                    }

                    gameGrid = foodRandom(gameGrid);
                    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
                    gameGrid[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;
                } else if (gameGrid[snake[0].x][snake[0].y] === 2) {
                    gameOverScreen();
                    return;
                }

                gameGrid[snake[0].x][snake[0].y] = 2;
            } else {
                if (i === (snake.length - 1)) {
                    gameGrid[snake[i].x][snake[i].y] = null;
                }

                snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
                gameGrid[snake[i].x][snake[i].y] = 2;
            }
        }

        // Draw the border as well as the score
        uiText();

        // Start cycling the matrix
        for (var x = 0; x < gameGrid.length; x++) {
            for (var y = 0; y < gameGrid[0].length; y++) {
                if (gameGrid[x][y] === 1) {
                    var img=document.getElementById("food");
                    var pat=ctx.createPattern(img,"repeat");
                    ctx.fillStyle = pat;
                    ctx.fillRect(x * 20, y * 20 + 20, 20, 20);
                } else if (gameGrid[x][y] === 2) {
                    var img2=document.getElementById("sbody");
                    var pat2=ctx.createPattern(img2,"repeat");

                    ctx.fillStyle = pat2;
                    
                    ctx.fillRect(x * 20, y * 20 + 20, 20, 20);
                      
                    
                }
            }
        }
        
        if (active) {
          rungame= window.requestAnimationFrame(animate);
        }
    }

     window.addEventListener('keydown', function(e) {
       // alert(e.keyCode);
        
        if (e.keyCode === 38 && (snake[0].y - 1) != snake[1].y)  {
            direction = 2; // up direction
        } else if (e.keyCode === 40 && (snake[0].y + 1) != snake[1].y) {
            direction = 3; // down direction
        } else if (e.keyCode === 37 && (snake[0].x - 1) != snake[1].x) {
            direction = 1; // left direction
        } else if (e.keyCode === 39 && (snake[0].x + 1) != snake[1].x) {
            direction = 0; // Right direction
        }else if (e.keyCode === 32){
              //alert('Ding');
            if(click==false){
                 window.cancelAnimationFrame(rungame);
                active=false;
                click = true;
                eatSound.pause();
                gameSound.pause();
            }else{
                window.cancelAnimationFrame(rungame);
                rungame = window.requestAnimationFrame(animate);
                active=true;
                click = false;
                 gameSound.play();
               // animate();
            }
        }
       
    });
};