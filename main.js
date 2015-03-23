// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv'); 
var waterBalls;
var waterBall2;
var corners;
var pipesDown;
var pipesVertical;
var pipesVertical2;
var createBall;
var frecuency;
var top1;
var top2;
var top3;
var top4;
var down1;
var down2;
var down3;
var down4;

function createWaterBall (WBGroup, i,  j, gravityX, gravityY, velocityX, velocityY, bounce) {
    var wBall = WBGroup.create(i, j, 'circle');
    wBall.body.velocity.setTo(velocityX, velocityY);
    wBall.body.gravity.set(gravityX, gravityY);
    wBall.body.bounce.set(bounce); 
    wBall.body.collideWorldBounds = false;
    wBall.checkWorldBounds = true;
    wBall.events.onOutOfBounds.add(destruir, this);
    wBall.alive = true;
}

function destruir(wBall){
    wBall.alive = false;
}

function createLeftDownCorner(i, j){
    var corner = corners.create(i, j, 'corner1');
    corner.body.immovable = true;   
}

function createRightTopCorner(i, j){
    var corner = corners.create(i, j, 'corner4');
    corner.body.immovable = true;   
}

function createTopWall(i, j) {
    var pipeDown = pipesDown.create(i, j, 'pipeUp');
    pipeDown.body.immovable = true;
    return pipeDown;
}

function createDownWall(i, j) {
    var pipeDown = pipesDown.create(i, j, 'pipeDown');
    pipeDown.body.immovable = true;    
    return pipeDown;
}

function createLeftWall(i, j) {
    var pipeDown = pipesDown.create(i, j, 'pipeLeft');
    pipeDown.body.immovable = true;    
    return pipeDown;
}

function createRightWall(i, j) {
    var pipeDown = pipesDown.create(i, j, 'pipeRight');
    pipeDown.body.immovable = true;    
    return pipeDown;
}

function createBlock (i, j) {
    var corner = corners.create(i, j, 'block');
    corner.body.immovable = true;
}

var limit1, limit2, limit3, limit4;

function actionOnClick1 () 
{      
    
    if (limit1 < 4) {
        down1.scale.y += 0.5;
        down1.position.y -= 5;
        top1.scale.y  +=0.5;
        limit1 +=1; 
    }
}

function actionOnClick2 () 
{
    if (limit1 > 0) {
        down1.scale.y -= 0.5;
        down1.position.y += 5;
        top1.scale.y  -=0.5;
        limit1 -=1; 
    }     
}

function actionOnClick3 () 
{
    if (limit2 < 4) {
        down2.scale.y += 0.5;
        down2.position.y -= 5;
        top2.scale.y  +=0.5;
        limit2 +=1; 
    }
}

function actionOnClick4 () 
{
    if (limit2 > 0) {
        down2.scale.y -= 0.5;
        down2.position.y += 5;
        top2.scale.y  -=0.5;
        limit2 -=1; 
    }
}

function actionOnClick5 () 
{
    if (limit3 < 4) {
        down3.scale.x += 0.5;
        down3.position.x -= 5;
        top3.scale.x  +=0.5;
        limit3 +=1; 
    }
}

function actionOnClick6 () 
{
    if (limit3 > 0) {
        down3.scale.x -= 0.5;
        down3.position.x += 5;
        top3.scale.x  -=0.5;
        limit3 -=1; 
    }
}

function actionOnClick7 () 
{
    if (limit4 < 4) {
        down4.scale.x += 0.5;
        down4.position.x -= 5;
        top4.scale.x  +=0.5;
        limit4 +=1; 
    }
}

function actionOnClick8 () 
{
    if (limit4 > 0) {
        down4.scale.x -= 0.5;
        down4.position.x += 5;
        top4.scale.x  -=0.5;
        limit4 -=1; 
    }
}



// Creates a new 'main' state that will contain the game
var mainState = {


    preload: function() { 
        game.stage.backgroundColor = '#71c5cf';
        //#318CF5 color pelotas
        game.load.image('circle'    , 'assets/Circle3.png');  
        game.load.image('pipeLeft'  , 'assets/pipeLeft2.png');      
        game.load.image('pipeRight' , 'assets/pipeRight2.png');
        game.load.image('pipeUp'    , 'assets/pipeUp.png');  
        game.load.image('pipeDown'  , 'assets/pipeDown.png');  
        game.load.image('block'     , 'assets/Block.png');  
        game.load.image('corner1'   , 'assets/Corner1.png');
        game.load.image('corner2'   , 'assets/Corner2.png');  
        game.load.image('corner3'   , 'assets/Corner3.png');  
        game.load.image('corner4'   , 'assets/Corner4.png');
        game.load.image('buttonLeft'   , 'assets/BotonLeft.jpg');    
        game.load.image('buttonRight'  , 'assets/BotonRight.jpg');    

    },
   


    create: function() { 
        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        corners = game.add.group();
        corners.enableBody = true;

        pipesDown = game.add.group();
        pipesDown.enableBody = true;
         
        waterBalls = game.add.group();
        waterBalls.enableBody = true;
        
        
        waterBalls2 = game.add.group();
        waterBalls2.enableBody = true;
        

        createBlock(0, 100);
        createBlock(50, 100);
        createBlock(0, 0);        
        createBlock(50, 0);        

        
        createBlock(735, 100);    
        createBlock(760, 100);    
        createBlock(735, 0);    
        createBlock(760, 0);   
        
        
        //createDownWall(450,100);
        //createRightWall(670,43);


        top1 = createTopWall (100 , 40);

        top2 = createTopWall  (220 , 40 );
               createTopWall  (284 , 40 );
               createTopWall  (351 , 40 );
        top3 = createLeftWall (217 , 110);
               createLeftWall (217 , 230);
               createLeftWall (217 , 290);
        top4 = createRightWall(277 , 110);
               createRightWall(277 , 230);
               createLeftWall (401 , 110);
               createLeftWall (401 , 230);
               createDownWall (220 , 401);
               createDownWall (351 , 401);
               createDownWall (471 , 401);
               createDownWall (591 , 401);
               createDownWall (711 , 401);
               createRightWall(461 , 110);
        down4= createRightWall(461 , 230); 
               //createRightWall(461 , 288);
        
               createDownWall(284 , 401);

               createRightWall(461, 43);



               createDownWall (284 , 100);
               createTopWall  (284 , 350);
        
               createTopWall  (468 , 350);
               createTopWall  (584 , 350);
               createTopWall  (704 , 350);
        
        down1 = createDownWall(100 , 100);
        //down2 = createDownWall(395 , 150);
        //down3 = createRightWall(670, 110);
    
        //createTopWall(150, 40);
 
        //Abajo
        
        //createTopWall(394, 385);
        //createTopWall(670, 385);
        //createDownWall(430, 440);
        //createDownWall(620, 440);
        //createLeftWall(610, 170);
        //  createRightWall(670,170);    
        
        
        
        limit1 = 0;
        limit2 = 0;
        limit3 = 0;
        limit4 = 0;

        cursors = game.input.keyboard.createCursorKeys();
        createBall = 0;
        frecuency = 0;
        xButton1 = 400;
        xButton2 = 200;
        xButton3 = 0;
        xButton4 = -200;
        
        yButton = 550;
        button1 = game.add.button(game.world.centerX - xButton1 + 120, yButton , 'buttonRight', actionOnClick1, this, 2, 1, 0);
        button2 = game.add.button(game.world.centerX - xButton1      , yButton , 'buttonLeft', actionOnClick2, this, 2, 1, 0);
        button3 = game.add.button(game.world.centerX - xButton2 + 120, yButton , 'buttonRight', actionOnClick3, this, 2, 1, 0);
        button4 = game.add.button(game.world.centerX - xButton2      , yButton , 'buttonLeft', actionOnClick4, this, 2, 1, 0);
        button5 = game.add.button(game.world.centerX - xButton3 + 120, yButton , 'buttonRight', actionOnClick5, this, 2, 1, 0);
        button6 = game.add.button(game.world.centerX - xButton3      , yButton , 'buttonLeft', actionOnClick6, this, 2, 1, 0);
        button7 = game.add.button(game.world.centerX - xButton4 + 120, yButton , 'buttonRight', actionOnClick7, this, 2, 1, 0);
        button8 = game.add.button(game.world.centerX - xButton4      , yButton , 'buttonLeft', actionOnClick8, this, 2, 1, 0);
        
        
        
    },

    update: function() {

        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, waterBalls);
        game.physics.arcade.collide(waterBalls, pipesDown);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, waterBalls2);
        game.physics.arcade.collide(waterBalls2, pipesDown);
        
        if(createBall % 19 == 0)
        {
            //createWaterBall(waterBalls, 0, 60, 400, 600, 300, 3500, 0.6);
            //createWaterBall(waterBalls, 0, 80, 400, 200, 200, 1500, 0.6);
        }
        
        if(createBall < 15 && frecuency % 23 == 0)
        {
            createWaterBall(waterBalls, 0, 60, 200, 1500, 200, 1000, 0.3);
            /*createWaterBall(waterBalls, 10, 40, 200, 1000, 100, 400, 0.8);
            createWaterBall(waterBalls, 0, 70 , 400, 400 , 200, 400, 0.7);
         */
         /*                   
            waterBalls.forEach(function(sprite) {   
            
                if (sprite.position.y > 385) {
                    if ((sprite.position.x > 270) && (sprite.position.x < 330))   {
                        sprite.body.velocity.setTo(200, 250);
                        sprite.body.gravity.set(200, -100); 
                    }

                    if ((sprite.position.x > 330) && (sprite.position.x < 610))   {
                        sprite.body.velocity.setTo(250, 100);
                        sprite.body.gravity.set(100, 200);
                    } 

                    if ((sprite.position.x > 610) && (sprite.position.x < 670))   {
                        sprite.body.velocity.setTo(200, 250);
                        sprite.body.gravity.set(-200, -100); 
                    }

                } else {
                        sprite.body.velocity.setTo(250, 100);
                        sprite.body.gravity.set(100, 200);
                }
                    
            });        

  
            waterBalls2.forEach(function(sprite) {     

                if (sprite.position.y > 385) {
                    
                    if ((sprite.position.x > 270) && (sprite.position.x < 330))   {
                        sprite.body.velocity.setTo(-200, 250);
                        sprite.body.gravity.set(-200, -100); 
                    }

                    if ((sprite.position.x > 330) && (sprite.position.x < 610))   {
                        sprite.body.velocity.setTo(250, 100);
                        sprite.body.gravity.set(100, -200);
                    } 


                    if ((sprite.position.x > 610) && (sprite.position.x < 670))  {
                        sprite.body.velocity.setTo(-200, 250);
                        sprite.body.gravity.set(-200, -100);
                    }
                
                 } else {
                        sprite.body.velocity.setTo(250, 100);
                        sprite.body.gravity.set(100, -200);
                }
            
            }); 
            
            */
            createBall++;
        }
        
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = 0;
                        sprite.position.y = 60;
                        sprite.body.velocity.setTo(100, 1000);
                    }
                }
            });
    },

};

game.state.add('main', mainState);  
game.state.start('main'); 