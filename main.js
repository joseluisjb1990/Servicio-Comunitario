// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv'); 
var waterBalls;
var waterBall2;
var corners;
var pipesDown;
var pipesVertical;
var pipesVertical2;
var createBall;
var top1;
var top2;
var top3;
var top4;
var down1;
var down2;
var down3;
var down4;

function createWaterBall (i,  j, k, l) {
    var wBall = waterBalls.create(i, j, 'circle');
    wBall.body.velocity.setTo(250, 100);
    wBall.body.gravity.set(100, 200);
    wBall.body.bounce.set(1.0); 
    wBall.body.collideWorldBounds = false;
    wBall.checkWorldBounds = true;
    wBall.events.onOutOfBounds.add(destruir, this);
    wBall.alive = true;

    var wBall2 = waterBalls2.create(i+20, j+20, 'circle');
    wBall2.body.velocity.setTo(250, 100);
    wBall2.body.gravity.set(100, -200);
    wBall2.body.bounce.set(1.0); 
    wBall2.body.collideWorldBounds = false;
    wBall2.checkWorldBounds = true;
    wBall2.events.onOutOfBounds.add(destruir, this);
    wBall2.alive = true;
    
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

function createBlockTop (i, j) {
    var corner = corners.create(i, j, 'pipeUp');
    corner.body.immovable = true;
}

function createBlockDown (i, j) {
    var corner = corners.create(i, j, 'pipeDown');
    corner.body.immovable = true;
}

function createBlockLeft (i, j) {
    var corner = corners.create(i, j, 'pipeLeft');
    corner.body.immovable = true;
}

function createBlockRight (i, j) {
    var corner = corners.create(i, j, 'pipeRight');
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
        game.load.image('circle'    , 'assets/circle3.png');  
        game.load.image('pipeLeft'  , 'assets/pipeLeft.png');      
        game.load.image('pipeRight' , 'assets/pipeRight.png');
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
        
        createBlockTop(454,40);
        createBlockDown(394,100);
        createBlockRight(670,43);


        top1 = createTopWall(60, 40);
        top2 = createTopWall(335, 40);
        top3 = createLeftWall(610, 110);
        top4 = createLeftWall(275, 110);
        
        down1 = createDownWall(60,100);
        down2 = createDownWall(335,100);
        down3 = createRightWall(670,110);
        down4 = createRightWall(335,110); 
    
        createBlockTop(280, 40);
 
        //Abajo
        
        createBlockLeft(275, 170); 
        createBlockLeft(275, 224); 
        createBlockRight(335, 170); 
        createBlockTop(344, 385);
        createBlockTop(394, 385);
        createBlockTop(670, 385);
        createBlockDown(278, 440);
        createBlockDown(430, 440);
        createBlockDown(620, 440);
        createBlockLeft(610, 170);
        createBlockRight(670,170);    
        
        
        
        limit1 = 0;
        limit2 = 0;
        limit3 = 0;
        limit4 = 0;

        cursors = game.input.keyboard.createCursorKeys();
        createBall = 0;

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
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls, waterBalls);
        game.physics.arcade.collide(waterBalls, pipesDown);
        game.physics.arcade.collide(waterBalls2, waterBalls2);
        game.physics.arcade.collide(waterBalls2, waterBalls);
        game.physics.arcade.collide(waterBalls2, pipesDown);
        
        
        if(createBall % 3 == 0)
        {
            for(var i = 1; i <= 2; i++)
            {
                createWaterBall(0, 80 - (10 * i), 5, 80 - (10 * i+5) );
                
            }
            
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
                    
                   /* if ((sprite.position.x > 270) && (sprite.position.x < 330))   {
                        sprite.body.velocity.setTo(-200, 250);
                        sprite.body.gravity.set(-200, -100); 
                    }*/

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

            waterBalls.forEach(function(sprite) {
                      
                console.debug('destroying:');

                if (sprite) { 
                    if(!sprite.alive) {
                        waterBalls.removeChild(sprite);
                        sprite.destroy(false);
                    }
                }
                console.log('destroyed: ')
            });
            
            waterBalls2.forEach(function(sprite) {
                console.debug('destroying:');
                 
                
                if (sprite) { 
                    if(!sprite.alive) {
                        waterBalls2.removeChild(sprite);
                        sprite.destroy(false);
                    }
                }
                console.log('destroyed: ')
            });       
            
        }
        createBall++;
        


        
        
        
        
        down1.body.velocity.x = 0;
        down1.body.velocity.y = 0;
        down2.body.velocity.x = 0;
        down2.body.velocity.y = 0;
        down3.body.velocity.x = 0;
        down3.body.velocity.y = 0;    
        down4.body.velocity.x = 0;
        down4.body.velocity.y = 0; 
        top1.body.velocity.x = 0;
        top1.body.velocity.y = 0;
        top2.body.velocity.x = 0;
        top2.body.velocity.y = 0;
        top3.body.velocity.x = 0;
        top3.body.velocity.y = 0;
        top4.body.velocity.x = 0;
        top4.body.velocity.y = 0;

    },

};

game.state.add('main', mainState);  
game.state.start('main'); 