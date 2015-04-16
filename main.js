//Nivel 1

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv'); 

//Variables 
var waterBalls, waterBall2;
var corners, tanks, pipes, posters;
var limit1= 0, limit2= 0, limit3= 0, limit4= 0, limitTank= 0;
var createBall= 0, frecuency= 0, power= 1;
var changeTank = false; 
var cursors;

//Top son los izquierdos en caso de ser un tubo bajando
var top1, top2, top3, top4, top5;
var down1, down2, down3, down4, top5;
var scoreText;

//Coordenadas boton potencia
var xButtonMorePower = 0, xButtonLessPower = 0;
var yButtonMorePower = 0, yButtonLessPower = 0;

var xTank= 16, yTank= 130; 

var cantPoster1 = 5;
var cantPoster2 = 5;
var resTot = 20, resAct = 5;
var resTot1 = 20, resAct1 = 5;
var ampTot = 1, ampAct = 4;
var textPoster1, textPoster2, textRes, textAmp, textRes1; 



function createWaterBall (WBGroup, i,  j, gravityX, gravityY, velocityX, velocityY, bounce) {
    var wBall = WBGroup.create(i, j, 'circle');
    wBall.body.velocity.setTo(velocityX, velocityY);
    wBall.body.gravity.set(gravityX, gravityY);
    wBall.body.bounce.set(bounce); 
    wBall.body.collideWorldBounds = false;
    wBall.checkWorldBounds = true;
    wBall.events.onOutOfBounds.add(destroy, this);
    wBall.alive = true;
}

function destroy(wBall){
    wBall.alive = false;
}

function createTank(i, j){
    var tank = tanks.create(i, j, 'tank1');
    tank.body.immovable = true;   
}

function createLeftDownCorner(i, j){
    var corner = corners.create(i, j, 'corner1');
    corner.body.immovable = true;   
    corner.input.start();
}

function createRightTopCorner(i, j){
    var corner = corners.create(i, j, 'corner4');
    corner.body.immovable = true;   
}

function createTopWall(i, j) {
    var pipeDown = pipes.create(i, j, 'pipeUp');
    pipeDown.body.immovable = true;
    return pipeDown;
}

function createDownWall(i, j) {
    var pipeDown = pipes.create(i, j, 'pipeDown');
    pipeDown.body.immovable = true;    
    return pipeDown;
}

function createLeftWall(i, j) {
    var pipeDown = pipes.create(i, j, 'pipeLeft');
    pipeDown.body.immovable = true;    
    return pipeDown;
}

function createRightWall(i, j) {
    var pipeDown = pipes.create(i, j, 'pipeRight');
    pipeDown.body.immovable = true;    
    return pipeDown;
}

function createBlock(i, j) {
    var corner = corners.create(i, j, 'block');
    corner.body.immovable = true;
}

function createPoster(i, j) {
    var poster = posters.create(i, j, 'poster');
    poster.body.immovable = true;
    
    game.debug.text(cantPoster1,278, 221 );
   // text2 = game.add.text(278, 221, cantPoster1);
}

function createMeter(i, j){
    var poster = posters.create(i, j, 'meter');
    poster.body.immovable = true; 
}


function actionOnClickTop1 () 
{        
    if (limit1 < 3) {
        down1.scale.y    += 0.75;
        down1.position.y -= 7.5;
        top1.scale.y     += 0.75;
        limit1           += 1;
        cantPoster1 = cantPoster1 + 5;
    }
}

function actionOnClickDown1 () 
{
    if (limit1 > 0) {
        down1.scale.y    -= 0.75;
        down1.position.y += 7.5;
        top1.scale.y     -= 0.75;
        limit1           -=1; 
        cantPoster1 = cantPoster1 - 5;
    }     
}

function actionOnClickTop2 () 
{
    if (limit2 < 3) {
        down2.scale.y    += 0.75;
        down2.position.y -= 7.5;
        top2.scale.y     += 0.75;
        limit2           += 1;
        cantPoster2 = cantPoster2 + 5;
    }
}

function actionOnClickDown2 () 
{
    if (limit2 > 0) {
        down2.scale.y    -= 0.75;
        down2.position.y += 7.5;
        top2.scale.y     -= 0.75;
        limit2           -= 1; 
        cantPoster2 = cantPoster2 - 5;
    }
}

function actionOnClickTop3 () 
{
    if (limit3 < 3) {
        down3.scale.y    += 0.75;
        down3.position.y -= 7.5;
        top3.scale.y     += 0.75;
        limit3           += 1; 
    }
}

function actionOnClickDown3 () 
{
    if (limit3 > 0) {
        down3.scale.x    -= 0.5;
        down3.position.x += 5;
        top3.scale.x     -= 0.5;
        limit3           -= 1; 
    }
}

function actionOnClickTop4 () 
{
    if (limit4 < 3) {
        down4.scale.y    += 0.75;
        down4.position.y -= 7.5;
        top4.scale.y     += 0.75;
        limit4           += 1; 
    }
}

function actionOnClickDown4 () 
{
    if (limit4 > 0) {
        down4.scale.x    -= 0.5;
        down4.position.x += 5;
        top4.scale.x     -= 0.5;
        limit4           -= 1; 
    }
}

function actionOnClickTop5 () 
{
    if (limit5 < 3) {
        down5.scale.y    += 0.75;
        down5.position.y -= 7.5;
        top5.scale.y     += 0.75;
        limit5           += 1; 
    }
}

function actionOnClickDown5 () 
{
    if (limit5 > 0) {
        down5.scale.x    -= 0.5;
        down5.position.x += 5;
        top5.scale.x     -= 0.5;
        limit5           -= 1; 
    }
}

function actionOnClickMorePower ()
{
   if (limitTank < 2) {

        if (limitTank == 0) {
            var tank = tanks.create(xTank, yTank, 'tank2');
            tank.body.immovable = true;  
            
        }
       
        if (limitTank == 1) {
            var tank = tanks.create(xTank, yTank, 'tank3');
            tank.body.immovable = true;   
        }  
        power += 1;
        changeTank = true;
        limitTank += 1;
    }
}

function actionOnClickLessPower ()
{
    if (limitTank > 0) {

        if (limitTank == 1) {
            var tank = tanks.create(xTank, yTank, 'tank1');
            tank.body.immovable = true;   
        }
       
        if (limitTank == 2) {
            var tank = tanks.create(xTank, yTank, 'tank2');
            tank.body.immovable = true;   
        }  
        
        power = 0;
        changeTank = true;
        limitTank -= 1;            
    }

}

function victory1level ()
{            
    this.state.start('main2');
}

var mainState2 = {
    preload: function() { 
        game.stage.backgroundColor = '#71c5cf';
        //#318CF5 color pelotas
        game.load.image('circle'       , 'assets/water.png');  
        game.load.image('pipeLeft'     , 'assets/pipeLeft.png');      
        game.load.image('pipeRight'    , 'assets/pipeRight.png');
        game.load.image('pipeUp'       , 'assets/pipeUp.png');  
        game.load.image('pipeDown'     , 'assets/pipeDown.png');  
        game.load.image('tank1'        , 'assets/tank1.png');
        game.load.image('tank2'        , 'assets/tank2.png');
        game.load.image('tank3'        , 'assets/tank3.png');
        game.load.image('button'      , 'assets/button.png');    
        game.load.image('button2'      , 'assets/button2.png');
        game.load.image('buttonPrueba1', 'assets/buttonPrueba.png');
        game.load.image('buttonPrueba2', 'assets/buttonPrueba2.png');
        game.load.image('arrow'        , 'assets/arrow.png');
        game.load.image('poster'       , 'assets/poster.png');
        game.load.image('meter'        , 'assets/meter.png');  

 },
   
    create: function() { 
        var xButtonTop1  = 180, xButtonTop2  = 450;
        var yButtonTop1  = 280, yButtonTop2  = 280;

        //Coordenadas de los botones de abrir tuberia (flecha)
        var xButtonDown1 = 235, xButtonDown2 = 505;
        var yButtonDown1 = 260, yButtonDown2 = 260;        
        //Todos los botones
      //buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
      //buttonLessPower = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button', actionOnClickTop2,  this, 2, 1, 0);
      //buttonTop3  = game.add.button( xButtonTop3,  yButtonTop3 ,  'buttonPrueba1', actionOnClickTop3,  this, 2, 1, 0);
      //buttonTop4  = game.add.button (xButtonTop4,  yButtonTop4 ,  'buttonPrueba1', actionOnClickTop4,  this, 2, 1, 0);
      //buttonTop5  = game.add.button( xButtonTop5,  yButtonTop5 ,  'buttonPrueba1', actionOnClickTop5,  this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 2");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();
        
        //Inicializando ando
        corners = game.add.group();
        corners.enableBody = true;

        pipes = game.add.group();
        pipes.enableBody = true;

        posters = game.add.group();
        posters.enableBody = true;
        
        waterBalls = game.add.group();
        waterBalls.enableBody = true;
        
        waterBalls2 = game.add.group();
        waterBalls2.enableBody = true;
        
        tanks = game.add.group();
        tanks.enableBody = true;

        //Tanque
        createTank(-25,180);
         
        
        //Contadores
        
        createPoster(210, 220);
        textPoster1 = game.add.text(218, 221, cantPoster1);
        
        createPoster(480, 220);
        textPoster2 = game.add.text(488, 221, cantPoster2);
   
        
        createMeter(665,220);
        textRes1 = game.add.text(670, 221, resAct1+"/"+resTot1);
 
        //Resistencias
        top1  = createTopWall (180, 270);
        down1 = createDownWall(180, 340);  
       

        top2  = createTopWall (450, 270);
        down2 = createDownWall(450, 340);  
        
        //Tuberias Fijas
        createTopWall (0, 270);
        createDownWall(0, 340);

        createTopWall (120, 270);
        createDownWall(120, 340);      
        
        createTopWall (240, 270);
        createDownWall(240, 340);             
        
        createTopWall (360, 270);
        createDownWall(360, 340);        
        
        createTopWall (480, 270);
        createDownWall(480, 340);         
        
        createTopWall (600, 270);
        createDownWall(600, 340);
        
        createTopWall (720, 270);
        createDownWall(720, 340);
        
        var xButtonDown1 = 235, xButtonDown2 = 505;
        var yButtonDown1 = 260, yButtonDown2 = 260;  
        
        buttonDown2 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow' , actionOnClickDown1, this, 2, 1, 0);
        buttonDown1 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow' , actionOnClickDown2, this, 2, 1, 0);
      //buttonDown3 = game.add.button( xButtonDown3, yButtonDown3,  'arrow' , actionOnClickDown3, this, 2, 1, 0);
      //buttonDown4 = game.add.button( xButtonDown4, yButtonDown4,  'arrow' , actionOnClickDown4, this, 2, 1, 0);
      //buttonDown5 = game.add.button( xButtonDown5, yButtonDown5,  'arrow' , actionOnClickDown5, this, 2, 1, 0);   
        
        
    },

    update: function() {
        
        //Actualizador numeros
        textPoster1.text  = cantPoster1;
        textPoster2.text  = cantPoster2;
        textRes1.text     = 'RT: ' + (cantPoster1 + cantPoster2) +'/'+resTot1; 

        //Coliciones
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);
        game.physics.arcade.collide(waterBalls, waterBalls2); 

        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , 0, 310 , 200, -450 , 300, 100, 1.0);   
              createWaterBall(waterBalls2 , 0, 300, 200, 450 , 300, -100, 1.0);
              createBall++;
            }
        }
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = 0;
                        sprite.position.y = 310;
                        sprite.body.velocity.setTo(250, 130);
                    } else {
                        
                        if (changeTank) {
                        
                            sprite.body.velocity.setTo(300, 100);
                        }
                    }
                    
                }
            
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = 0;
                        sprite.position.y = 300;
                        sprite.body.velocity.setTo(300, -100);
                    } else {
                        
                        if (changeTank) {
                        
                            sprite.body.velocity.setTo(250, 100);
                            changeTank = false;
                        }
                    }
                }
            });
        changeTank = false;
    },
};

var mainState = {


    preload: function() { 
        game.stage.backgroundColor = '#71c5cf';
        //#318CF5 color pelotas
        game.load.image('circle'       , 'assets/water.png');  
        game.load.image('pipeLeft'     , 'assets/pipeLeft.png');      
        game.load.image('pipeRight'    , 'assets/pipeRight.png');
        game.load.image('pipeUp'       , 'assets/pipeUp.png');  
        game.load.image('pipeDown'     , 'assets/pipeDown.png');  
        game.load.image('tank1'        , 'assets/tank1.png');
        game.load.image('tank2'        , 'assets/tank2.png');
        game.load.image('tank3'        , 'assets/tank3.png');
        game.load.image('button1'      , 'assets/button.png');    
        game.load.image('button2'      , 'assets/button2.png');
        game.load.image('buttonPrueba1', 'assets/buttonPrueba.png');
        game.load.image('buttonPrueba2', 'assets/buttonPrueba2.png');
        game.load.image('arrow'        , 'assets/arrow.png');
        game.load.image('poster'       , 'assets/poster.png');
        game.load.image('meter'        , 'assets/meter.png');
        game.load.image('buttonLeft'   , 'assets/BotonLeft.jpg');    
        game.load.image('buttonRight'  , 'assets/BotonRight.jpg');    
        game.load.image('buttonPower'  , 'assets/BotonPower.jpg');    

 },
   
    create: function() { 
        var xButtonTop1  = 240;
        var yButtonTop1  = 280;
        //Todos los botones
      //buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
      //buttonLessPower = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
      //buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'buttonPrueba1', actionOnClickTop2,  this, 2, 1, 0);
      //buttonTop3  = game.add.button( xButtonTop3,  yButtonTop3 ,  'buttonPrueba1', actionOnClickTop3,  this, 2, 1, 0);
      //buttonTop4  = game.add.button (xButtonTop4,  yButtonTop4 ,  'buttonPrueba1', actionOnClickTop4,  this, 2, 1, 0);
      //buttonTop5  = game.add.button( xButtonTop5,  yButtonTop5 ,  'buttonPrueba1', actionOnClickTop5,  this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 1");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();
        
        //Inicializando ando
        corners = game.add.group();
        corners.enableBody = true;

        pipes = game.add.group();
        pipes.enableBody = true;

        posters = game.add.group();
        posters.enableBody = true;
        
        waterBalls = game.add.group();
        waterBalls.enableBody = true;
        
        waterBalls2 = game.add.group();
        waterBalls2.enableBody = true;
        
        tanks = game.add.group();
        tanks.enableBody = true;

        //Tanque
        createTank(-25,180);
         
        
        //Contadores
        createPoster(270, 220);
        textPoster1 = game.add.text(278, 221, cantPoster1);
       
        createMeter(500,220);
        textRes = game.add.text(520, 221, resAct+"/"+resTot);
        textAmp = game.add.text(520, 190, ampAct+"/"+ampTot);

        //Resistencias
        top1  = createTopWall (240, 270);
        down1 = createDownWall(240, 340);  
        
        //Tuberias Fijas
        createTopWall (0, 270);
        createDownWall(0, 340);

        createTopWall (120, 270);
        createDownWall(120, 340);      
        
        createTopWall (240, 270);
        createDownWall(240, 340);             
        
        createTopWall (360, 270);
        createDownWall(360, 340);        
        
        createTopWall (480, 270);

        createDownWall(480, 340);         
        
        createTopWall (600, 270);
        createDownWall(600, 340);
        
        createTopWall (720, 270);
        createDownWall(720, 340);
        
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow'        , actionOnClickDown1, this, 2, 1, 0);
      //buttonDown2 = game.add.button( xButtonDown1, yButtonDown2 , 'arrow'        , actionOnClickDown2, this, 2, 1, 0);
      //buttonDown3 = game.add.button( xButtonDown1, yButtonDown3,  'arrow'        , actionOnClickDown3, this, 2, 1, 0);
      //buttonDown4 = game.add.button( xButtonDown1, yButtonDown4,  'arrow'        , actionOnClickDown4, this, 2, 1, 0);
      //buttonDown5 = game.add.button( xButtonDown1, yButtonDown5,  'arrow'        , actionOnClickDown5, this, 2, 1, 0);   
        
        
    },

    update: function() {
        
        textPoster1.text  = cantPoster1;
        resAct = cantPoster1;
        textRes.text  = 'RT: ' + resAct+'/'+resTot + ' Ohm'; 
        var ampT = 20/resAct;
        textAmp.text  = 'AT: ' + ampT.toFixed(1) +'/'+ampTot + ' Amp'; 

        //Actualizador numeros
        if(resAct == resTot && ampT == ampTot)
        {
            this.state.start('winner');
        }
        //Coliciones
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);
        game.physics.arcade.collide(waterBalls, waterBalls2); 
        
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , 0, 310 , 200, -450 , 300, 100, 1.0);   
              createWaterBall(waterBalls2 , 0, 300, 200, 450 , 300, -100, 1.0);
              createBall++;
            }
        }
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = 0;
                        sprite.position.y = 310;
                        sprite.body.velocity.setTo(300, 100);
                    }
                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = 0;
                        sprite.position.y = 300;
                        sprite.body.velocity.setTo(300, -100);
                    }
                }
            });        
    },

};

var textWinner;

var winnerState = {


    preload: function() { 
        game.stage.backgroundColor = '#71c5cf';
        game.load.image('poster'       , 'assets/poster.png');  
 },
   
    create: function() {
        textWinner = game.add.text(300, 250, "¡GANASTE!", { size:'458px', fontSize: '128px', fill: '#000' });
        cursors = game.input.keyboard.createCursorKeys();
        
        buttonDown1 = game.add.button( 350, 350 , 'poster', victory1level, this, 2, 1, 0); 
        
        resAct = 0;
        cantPoster1 = 5;
        cantPoster2 = 5;
        limit1 = 0;
        limit2 = 0;
    },

    update: function() { textWinner = '¡GANASTE!'},

};

game.state.add('main', mainState);
game.state.add('main2', mainState2);
game.state.add('winner', winnerState);
game.state.start('main');