var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv'); 

//Variables 
var waterBalls, waterBall2;
var corners, tanks, pipes, posters;
var limit1= 0, limit2= 0, limit3= 0, limit4= 0, limitTank= 1;
var createBall= 0, frecuency= 0, power= 1;
var changeTank = false; 
var cursors;

//Top son los izquierdos en caso de ser un tubo bajando
var top1, top2, top3, top4, top5;
var down1, down2, down3, down4, top5;
var scoreText;
var showTitle = true;
//Coordenadas de los botones de cerrar tuberia0
var xButtonTop1  = 240, xButtonTop2  = 0, xButtonTop3  = 0, xButtonTop4  = 0, xButtonTop5  = 0;
var yButtonTop1  = 280, yButtonTop2  = 0, yButtonTop3  = 0, yButtonTop4  = 0, yButtonTop5  = 0;

//Coordenadas de los botones de abrir tuberia (flecha)
var xButtonDown1 = 295, xButtonDown2 = 0, xButtonDown3 = 0, xButtonDown4 = 0, xButtonDown5 = 0;
var yButtonDown1 = 260, yButtonDown2 = 0, yButtonDown3 = 0, yButtonDown4 = 0, yButtonDown5 = 0;

//Coordenadas boton potencia
var xButtonMorePower = 0, xButtonLessPower = 0;
var yButtonMorePower = 0, yButtonLessPower = 0;

var xTank= -25, yTank= 180; 

var siguienteNivel = 2;
var cantResistancia = 5;

var cantPower1 = 20, cantPoster1 = 5, cantPoster2 = 0, cantPoster3 = 0,  cantPoster4 = 0,  cantPoster5 = 0;

var resTot = 20, resTot1 = 20, resTot2 = 0, resTot3 = 0, resTot4 = 0, resTot5 = 0;
var resAct = 5,  resAct1 = 5,  resAct2 = 0, resAct3 = 0, resAct4 = 0, resAct5 = 0;
var ampTot = 1, ampTot2 = 1, ampTot3 = 1, ampTot4 = 1, ampTot5 = 1;
var ampAct = 4, ampAct2 = 4, ampAct3 = 4, ampAct4 = 4, ampAct5 = 4;
var voltTot = 0, voltAct = 0;
var textWinner, textButton;
var textRes, textAmp, textAmp2, textAmp3, textPower1, textVolt;
var textPoster1, textPoster2, textPoster3, textPoster4, textPoster5;
var textRes1, textRes2, textRes3, textRes4, textRes5; 

//////////////////////////////////////////////////////////NIVEL 15///////////////////////////////////////////////////////

var mainState15 = {

    create: function() { 
        clean();
        updateLevel15();
        
        //Todos los botones
        buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
        buttonLessPower = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow2', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
        buttonTop3  = game.add.button( xButtonTop3,  yButtonTop3 ,  'button1', actionOnClickTop3,  this, 2, 1, 0);
        //buttonTop4  = game.add.button (xButtonTop4,  yButtonTop4 ,  'button', actionOnClickTop4,  this, 2, 1, 0);
        buttonTop5  = game.add.button( xButtonTop5,  yButtonTop5 ,  'button1', actionOnClickTop5,  this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 15");
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
        createTank(xTank,yTank);
         

        //Contadores  
        textPower1 = game.add.text(18, 141, cantPower1);
        createPoster(10, 140);
        
        createPoster(220, 230);
        textPoster1 = game.add.text(228, 231, cantPoster1);
 
        createPoster(530, 230);
        textPoster2 = game.add.text(538, 231, cantPoster2);
 
        createPoster(220, 30);
        textPoster3 = game.add.text(228, 31, cantPoster3);
        
        createPoster(530, 430);
        textPoster4 = game.add.text(538, 431, cantPoster4);
        
        createMeter2(650,200);
        textRes1 = game.add.text(655, 231, resAct1+"/"+resTot1);
        textAmp =  game.add.text(655, 200, ampAct+"/"+ampTot);
        
        createMeter2(650,400);
        textRes2 = game.add.text(655, 431, resAct2+"/"+resTot2);
        textAmp2 = game.add.text(655, 400, ampAct2+"/"+ampTot2);
         
        createMeter2(350,200);
        textRes3 = game.add.text(355, 231, resAct3+"/"+resTot3);
        textAmp3 =  game.add.text(355, 200, ampAct3+"/"+ampTot3);
        
        
        createMeter2(550,0);
        textRes4 = game.add.text(555, 31, resAct4+"/"+resTot4);
        textAmp4 =  game.add.text(555, 0, ampAct4+"/"+ampTot4);
        
        //Resistencias
        top1  = createTopWall (210, 280);
        down1 = createDownWall(210, 350);  
        
        top2  = createTopWall (520, 280);
        down2 = createDownWall(520, 350);
         
        //La de arriba
        top3  = createTopWall (210, 80);
        down3 = createDownWall(210, 150); 

        top5  = createTopWall (520, 480);
        down5 = createDownWall(520, 550);  
        
        //Tuberias Fijas
        createTopWall(0, 280);
        createDownWall (0, 350);

        createTopWall(10, 280);
        createDownWall (10, 350);

        createTopWall(200, 280);      
        createDownWall (200, 350);
        
        createTopWall(240, 280);             
        createDownWall (240, 350);
        
        createTopWall(360, 280);        
        createDownWall (330, 350);
        
        createTopWall(480, 280); 
        createDownWall (510, 350);
        createDownWall (540, 350);
        
        createTopWall(600, 280);
        createDownWall (600, 350);
        
        createTopWall(720, 280);
        createDownWall (720, 350);

        //Tubo subiendo 1
        createLeftWall(130, 80);
        createRightWall(200, 150);

        createLeftWall(130, 170);
        createRightWall(200, 170);
        
        
        //Tubo arriba
        createTopWall(140, 80);
    
        createDownWall (210, 150);
        
        createTopWall  (260, 80);   
        createDownWall (260, 150);
        
        createTopWall(360, 80);        
        createDownWall (380, 150);
        
        createTopWall(480, 80);         
        createDownWall (480, 150);
        
        createTopWall(600, 80);
        createDownWall (600, 150);
        
        createTopWall(720, 80);       
        createDownWall (720, 150);
        
        //Tubo bajando 1
        //createLeftWall(130, 350);
        //createRightWall(200, 350);

        createLeftWall(440, 440);
        //createRightWall(200, 370);
        

        //Tubo bajando2
        
        createLeftWall(440, 350);
        createRightWall(510, 350);

        createLeftWall(440, 370);
        createRightWall(510, 370);
        
        //Tubo de abajo
        //createTopWall (210, 480);
        createDownWall(440, 550);
        
        //createTopWall (230, 480);
        createDownWall(120, 350);
        
        //createTopWall (320, 480);
        //createDownWall(360, 550);
        
        createTopWall (520, 480);
        createDownWall(480, 550);
        
        createTopWall (600, 480);
        createDownWall(600, 550);
        
        createTopWall (720, 480);
        createDownWall(720, 550);       
          
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow'        , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow'        , actionOnClickDown2, this, 2, 1, 0);
        buttonDown3 = game.add.button( xButtonDown3, yButtonDown3,  'arrow'        , actionOnClickDown3, this, 2, 1, 0);
        //buttonDown4 = game.add.button( xButtonDown4, yButtonDown4,  'arrow'        , actionOnClickDown4, this, 2, 1, 0);
        buttonDown5 = game.add.button( xButtonDown5, yButtonDown5,  'arrow'        , actionOnClickDown5, this, 2, 1, 0);       
        
    },

    update: function() {
        
        //Actualizador numeros
        textPoster1.text = cantPoster1 + ' Ohm';
        textPoster2.text = cantPoster2 + ' Ohm';
        textPoster3.text = cantPoster3 + ' Ohm';
        textPoster4.text = cantPoster4 + ' Ohm';
        textPower1.text  = cantPower1  + ' Watt';
        
        resAct1 = cantPoster2;
        resAct2 = cantPoster5;
        resAct3=  cantPoster1;
        resAct4 = cantPoster3;
        
        var r1 = resAct3;
        var r2 = resAct1;
        var r3 = resAct2;
        var r4 = resAct4;
	
        var r23    = 1 / ((1/r2)+(1/r3));
        var r123   = r23 + r1;
        var rTotal = 1 / ((1/r123)+(1/r4));
        
        var vTotal = 20 * limitTank;
        var iTotal = vTotal / rTotal;
        
        
        var v4   = vTotal;
        var i4   = v4 / r4;

        var v123 = vTotal;
        var i123 = v123 / r123;
        
        var i23 = i123;
        var i1  = i123;
        
        var v23 = i23 * r23;
        
        var v2 = v23;
        var v3 = v23;
        
        var i2 = v2 / r2;
        var i3 = v3 / r3;

        
         ampAct  = i2; // El segundo de la tuberia principal
         ampAct2 = i3; // El de abajo
         ampAct3 = i1; // El primero de la tuberia principal
         ampAct4 = i4; // El de arriba
        
        
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 
        textRes3.text = resAct3+'/'+resTot3 + ' Ohm'; 
        textRes4.text = resAct4+'/'+resTot4 + ' Ohm'; 
        
        
        textAmp.text  = ampAct.toFixed(1)  +'/'+ ampTot  + 'Amp'; 
        textAmp2.text = ampAct2.toFixed(1) +'/'+ ampTot2 + 'Amp'; 
        textAmp3.text = ampAct3.toFixed(1) +'/'+ ampTot3 + 'Amp'; 
        textAmp4.text = ampAct4.toFixed(1) +'/'+ ampTot4 + 'Amp'; 

        
        if (resAct1==resTot1 && resAct2==resTot2 && resAct3==resTot3 && resAct4==resTot4 && vTotal == 60) {
            if (showTitle) {
                textWinner = game.add.text(350, 100, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            //button = game.add.button( 350, 290 , 'poster2', victoryLevel15, this, 2, 1, 0); 
         //   textButton = game.add.text(360, 292, "Siguiente");

        }
        
        
        //Colisiones
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);
        game.physics.arcade.collide(waterBalls, waterBalls);
        game.physics.arcade.collide(waterBalls2, waterBalls2);
        
        var xPosBalls1 = 0;
        var yPosBalls1 = 310;
        var xPosBalls2 = 0;
        var yPosBalls2 = 300;
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1     , 200, -250 , 300, 100 , 0.8); 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1-10  , 200, -450 , 300, 100 , 0.8);    
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2    , 200,  450 , 300, -100, 0.8);
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2+10 , 200,  250 , 300, -100, 0.8);
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
                    } else
                    {
                       // makeItDown(sprite, 450, 290);
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
                    } else
                    {
                       // makeItUp(sprite, 140, 300);
                    }
                }
            });
        changeTank = false;
    },

};

//////////////////////////////////////////////////////////NIVEL 14///////////////////////////////////////////////////////

var mainState14 = {


    create: function() { 
        clean();
        updateLevel14();
        
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
        buttonTop5  = game.add.button( xButtonTop5,  yButtonTop5 ,  'button1', actionOnClickTop5,  this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 14");
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
        createTank(xTank,yTank);
         

        //Contadores  
        
        createPoster(230, 230);
        textPoster1 = game.add.text(238, 231, cantPoster1);
 
        createPoster(530, 230);
        textPoster2 = game.add.text(538, 231, cantPoster2);
 
        createPoster(530, 430);
        textPoster5 = game.add.text(538, 431, cantPoster5);
        
        createMeter2(650,200);
        textRes1 = game.add.text(655, 231, resAct1+"/"+resTot1);
        textAmp =  game.add.text(655, 200, ampAct+"/"+ampTot);

        createMeter2(650,400);
        textRes2 = game.add.text(655, 431, resAct2+"/"+resTot2);
        textAmp2 =  game.add.text(655, 400, ampAct2+"/"+ampTot2);

        createMeter2(350,200);
        textRes3 = game.add.text(355, 231, resAct3+"/"+resTot3);
        textAmp3 =  game.add.text(355, 200, ampAct3+"/"+ampTot3);

        createMeter2(550,0);
        textRes4 = game.add.text(555, 31, resAct4+"/"+resTot4);
        textAmp4=  game.add.text(555, 0, ampAct4+"/"+ampTot4);
        
        //Resistencias
        top1  = createTopWall (220, 280);
        down1 = createDownWall(220, 350);  
        
        top2  = createTopWall (520, 280);
        down2 = createDownWall(520, 350);
                    
        top5  = createTopWall (520, 480);
        down5 = createDownWall(520, 550);  
        
        //Tuberias Fijas
        createTopWall(0, 280);
        createDownWall (0, 350);

        createTopWall(10, 280);
        createDownWall (80, 350);

        createTopWall(200, 280);      
        createDownWall (200, 350);
        
        createTopWall(240, 280);             
        createDownWall (240, 350);
        
        createTopWall(360, 280);        
        createDownWall (330, 350);
        
        createTopWall(480, 280);         
        createDownWall (540, 350);
        createDownWall (520, 350);

        createTopWall(600, 280);
        createDownWall (600, 350);
        
        createTopWall(720, 280);
        createDownWall (720, 350);

        //Tubo subiendo
        createLeftWall(130, 80);
        createRightWall(200, 150);

        createLeftWall(130, 170);
        createRightWall(200, 170);
        
        
        //Tubo arriba
        createTopWall(140, 80);
    
        createDownWall (210, 150);
        
        
        createTopWall  (260, 80);   
        createDownWall (260, 150);
        
        createTopWall(360, 80);        
        createDownWall (380, 150);
        
        createTopWall(480, 80);         
        createDownWall (480, 150);
        
        createTopWall(600, 80);
        createDownWall (600, 150);
        
        createTopWall(720, 80);       
        createDownWall (720, 150);
        
        

        //Tubo bajando
        
        createLeftWall(440, 350);
        createRightWall(510, 350);

        createLeftWall(440, 440);
        createRightWall(510, 370);
        
        //Tubo de abajo

        createTopWall (520, 480);
        createDownWall(450, 550);
        createDownWall(480, 550);
        
        createTopWall (600, 480);
        createDownWall(600, 550);
        
        createTopWall (720, 480);
        createDownWall(720, 550);       
               
        //createBlock(140, 300);
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow'        , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow'        , actionOnClickDown2, this, 2, 1, 0);
        buttonDown5 = game.add.button( xButtonDown5, yButtonDown5,  'arrow'        , actionOnClickDown5, this, 2, 1, 0);   
        
        
    },

    update: function() {
        
       
        //Actualizador numeros
        textPoster1.text = cantPoster1 + ' Ohm';
        textPoster2.text = cantPoster2 + ' Ohm';
        textPoster5.text = cantPoster5 + ' Ohm';
 
        var r1 = cantPoster1;
        var r2 = cantPoster2;
        var r3 = cantPoster5;
        var r4 = resAct4;
	
        var r23    = 1 / ((1/r2)+(1/r3));
        var r123   = r23 + r1;
        var rTotal = 1 / ((1/r123)+(1/r4));
        
        var vTotal = 20 * limitTank;
        var iTotal = vTotal / rTotal;
        
        
        var v4   = vTotal;
        var i4   = v4 / r4;

        var v123 = vTotal;
        var i123 = v123 / r123;
        
        var i23 = i123;
        var i1  = i123;
        
        var v23 = i23 * r23;
        
        var v2 = v23;
        var v3 = v23;
        
        var i2 = v2 / r2;
        var i3 = v3 / r3;
        
        ampAct  = i2;   // El segundo de la tuberia principal
        ampAct2 = i3;   // El de abajo
        ampAct3 = i123; // El primero de la tuberia principal
        ampAct4 = i4;   // El de arriba
        
        
        textRes1.text = cantPoster2+'/'+resTot1 + ' Ohm'; 
        textRes2.text = cantPoster5+'/'+resTot2 + ' Ohm'; 
        textRes3.text = cantPoster1+'/'+resTot3 + ' Ohm'; 
        textRes4.text = resAct4+'/'+resTot4 + ' Ohm'; 
        
        
        textAmp.text  = ampAct.toFixed(1)  +'/'+ ampTot  + 'Amp'; 
        textAmp2.text = ampAct2.toFixed(1) +'/'+ ampTot2 + 'Amp'; 
        textAmp3.text = ampAct3.toFixed(1) +'/'+ ampTot3 + 'Amp'; 
        textAmp4.text = ampAct4.toFixed(1) +'/'+ ampTot4 + 'Amp'; 
     
        
        if (cantPoster2 == resTot1 && cantPoster5 == resTot2 && cantPoster1 == resTot3) {
            if (showTitle) {
                textWinner = game.add.text(350, 100, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel14, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");            
        }


        //colisiones
        game.physics.arcade.collide(waterBalls, waterBalls);
        game.physics.arcade.collide(waterBalls2, waterBalls2);
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);
        
        var xPosBalls1 = 0;
        var yPosBalls1 = 310;
        var xPosBalls2 = 0;
        var yPosBalls2 = 300;
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1     , 200, -250 , 300, 100 , 0.8); 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1-10  , 200, -450 , 300, 100 , 0.8);    
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2    , 200,  450 , 300, -100, 0.8);
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2+10 , 200,  250 , 300, -100, 0.8);
              createBall++;
            }
        }
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls1;
                        sprite.position.y = yPosBalls1;
                        sprite.body.velocity.setTo(300, 100);
                    } else
                    {
                        makeItDown(sprite, 450, 290);
                    }
                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls2;
                        sprite.position.y = yPosBalls2;
                        sprite.body.velocity.setTo(300, -100);
                    } else
                    {
                        makeItUp(sprite, 140, 300);
                    }
                }
            });        
    },

};
function makeItUp(sprite, xPos, yPos)
{                      
    if(sprite.position.x > xPos && sprite.position.x < xPos + 60 && sprite.position.y > yPos && sprite.position.y < yPos + 60)
    {
        sprite.body.gravity.set(200, -500);
        sprite.body.velocity.setTo(300*limitTank, -500*limitTank);
    }

    if(sprite.position.x > xPos && sprite.position.x < xPos + 60 && sprite.position.y >= yPos + 60 && sprite.position.y < yPos + 80)
    {
        sprite.body.gravity.set(300, -200);
        sprite.body.velocity.setTo(300*limitTank, 200*limitTank);
    }
}
//////////////////////////////////////////////////////////NIVEL 13///////////////////////////////////////////////////////
var mainState13 = {

    create: function() { 
        clean();
        updateLevel13();
        
        //Todos los botones
        buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
        buttonLessPower = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow2', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
        buttonTop3  = game.add.button( xButtonTop3,  yButtonTop3 ,  'button1', actionOnClickTop3,  this, 2, 1, 0);
        buttonTop4  = game.add.button (xButtonTop4,  yButtonTop4 ,  'button1', actionOnClickTop4,  this, 2, 1, 0);
        buttonTop5  = game.add.button( xButtonTop5,  yButtonTop5 ,  'button1', actionOnClickTop5,  this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 13");
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
        createTank(xTank,yTank);
         
        //Contadores  
        textPower1 = game.add.text(18, 51, cantPower1);
        createPoster(10, 50);
        
        createPoster(370, 130);
        textPoster1 = game.add.text(378, 131, cantPoster1);
 
        createPoster(520, 130);
        textPoster2 = game.add.text(528, 131, cantPoster2);
 
        createPoster(220, 330);
        textPoster3 = game.add.text(228, 331, cantPoster3);
        
        createPoster(370, 330);
        textPoster4 = game.add.text(378, 331, cantPoster4);
 
        createPoster(520, 330);
        textPoster5 = game.add.text(528, 331, cantPoster5);
        
        createMeter2(650,100);
        textRes1 = game.add.text(655, 131, resAct1+"/"+resTot1);
        textAmp =  game.add.text(655, 100, ampAct+"/"+ampTot);
       
        createMeter2(650,300);
        textRes2 = game.add.text(655, 331, resAct2+"/"+resTot2);
        textAmp2 = game.add.text(655, 300, ampAct2+"/"+ampTot2);

        //Resistencias
        top1  = createTopWall (360, 180);
        down1 = createDownWall(360, 250);  
        
        top2  = createTopWall (510, 180);
        down2 = createDownWall(510, 250);
        
        top3  = createTopWall (210, 380);
        down3 = createDownWall(210, 450);
        
        top4  = createTopWall (360, 380);
        down4 = createDownWall(360, 450);  
            
        top5  = createTopWall (510, 380);
        down5 = createDownWall(510, 450);  
        
        //Tuberias Fijas
        createTopWall (0, 180);
        createDownWall(0, 250);

        createTopWall (80, 180);
        createDownWall(10, 250);

        createTopWall (200, 180);
        createDownWall(200, 250);      
        
        createTopWall (240, 180);
        createDownWall(240, 250);             
        
        createTopWall (360, 180);
        createDownWall(360, 250);        
        
        createTopWall (480, 180);
        createDownWall(480, 250);         
        
        createTopWall (600, 180);
        createDownWall(600, 250);
        
        createTopWall (720, 180);
        createDownWall(720, 250);
       
        //Tubo bajando
        
        createLeftWall(130, 250);
        createRightWall(200, 250);

        createLeftWall(130, 340);
        createRightWall(200, 270);
        
        //Tubo de abajo
        createDownWall(140, 450);
        
        createTopWall (210, 380);
        
        
        createTopWall (260, 380);
        createDownWall(260, 450);   
        
        createTopWall (380, 380);
        createDownWall(360, 450);        
        
        createTopWall (480, 380);
        createDownWall(480, 450);         
        
        createTopWall (600, 380);
        createDownWall(600, 450);
        
        createTopWall (720, 380);
        createDownWall(720, 450);       
        
        //createBlock(140, 190);
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow'        , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow'        , actionOnClickDown2, this, 2, 1, 0);
        buttonDown3 = game.add.button( xButtonDown3, yButtonDown3,  'arrow'        , actionOnClickDown3, this, 2, 1, 0);
        buttonDown4 = game.add.button( xButtonDown4, yButtonDown4,  'arrow'        , actionOnClickDown4, this, 2, 1, 0);
        buttonDown5 = game.add.button( xButtonDown5, yButtonDown5,  'arrow'        , actionOnClickDown5, this, 2, 1, 0);   
             
    },

    update: function() {
        
     
        //Actualizador numeros
        textPoster1.text = cantPoster1 + ' Ohm';
        textPoster2.text = cantPoster2 + ' Ohm';
        textPoster3.text = cantPoster3 + ' Ohm';
        textPoster4.text = cantPoster4 + ' Ohm';
        textPoster5.text = cantPoster5 + ' Ohm';
        textPower1.text  = cantPower1  + ' Watt';

        resAct1 = cantPoster1+cantPoster2;
        resAct2 = cantPoster3+cantPoster4+cantPoster5; 

       
        var r1 = cantPoster1;
        var r2 = cantPoster2;
        var r3 = cantPoster3;
        var r4 = cantPoster4;
        var r5 = cantPoster5;
        
        var r123 = r1 + r2;
        var r45  = r3 + r4 + r5;
        
        var rTotal = 1 / ((1/r123)+(1/r45));
        var vTotal = 20 * limitTank;
        var iTotal = vTotal / rTotal;
        

         //Valores individuales
         var ir1   = vTotal / r123;  //Imprimir en el medidor de arriba
         var ir23  = vTotal / r45; //Imprimir en el medidor de abajo
        
         ampAct  = ir1;
         ampAct2 = ir23;

        
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 

        textAmp.text  = ampAct.toFixed(1)  +'/'+ ampTot  + 'Amp'; 
        textAmp2.text = ampAct2.toFixed(1) +'/'+ ampTot2 + 'Amp'; 

        
        if (r123 == resTot1 && r45 == resTot2 && vTotal == 60) {          
            if (showTitle) {
                textWinner = game.add.text(350, 80, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel13, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
        }

        //colisiones
        game.physics.arcade.collide(waterBalls, waterBalls);
        game.physics.arcade.collide(waterBalls2, waterBalls2);
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);

        var xPosBalls1 = 0;
        var yPosBalls1 = 220;
        var xPosBalls2 = 0;
        var yPosBalls2 = 210;
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1     , 200, -250 , 300, 100 , 0.8); 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1-10  , 200, -450 , 300, 100 , 0.8);    
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2    , 200,  450 , 300, -100, 0.8);
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2+10 , 200,  250 , 300, -100, 0.8);
              createBall++;
            }
        }
        
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls1;
                        sprite.position.y = yPosBalls1;
                        sprite.body.velocity.setTo(300, 100);
                    } else
                    {
                        makeItDown(sprite, 140, 190);
                    }
                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls2;
                        sprite.position.y = yPosBalls2;
                        sprite.body.velocity.setTo(300, -100);
                    }
                }
            });        
    },

};

//////////////////////////////////////////////////////////NIVEL 12///////////////////////////////////////////////////////

var mainState12 = {
   
    create: function() { 
        clean();
        updateLevel12();
        
        buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
        buttonLessPower = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow2', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
        buttonTop3  = game.add.button( xButtonTop3,  yButtonTop3 ,  'button1', actionOnClickTop3,  this, 2, 1, 0);
    
        var text = game.add.text(350, 20, "Nivel 12");
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
        createTank(xTank,yTank);
         

        //Contadores
        textPower1 = game.add.text(18, 51, cantPower1);
        createPoster(10, 50);
        
        createPoster(100, 130);
        textPoster1 = game.add.text(108, 131, cantPoster1);
        
        createPoster(510, 130);
        textPoster2 = game.add.text(518, 131, cantPoster2);
       
        createMeter2(650,100);
        textRes1 = game.add.text(655, 131, resAct1+"/"+resTot1);
        textAmp =  game.add.text(655, 100, ampAct+"/"+ampTot);
        
        createPoster(510, 330);
        textPoster3 = game.add.text(518, 331, cantPoster3);

        createMeter2(650,300);
        textRes2 = game.add.text(655, 331, resAct2+"/"+resTot2);
        textAmp2 = game.add.text(655, 300, ampAct2+"/"+ampTot2);
        
        createMeter2(220,100);
        textRes3 = game.add.text(225, 131, resAct3+"/"+resTot3);
        textAmp3 = game.add.text(225, 100, ampAct3+"/"+ampTot3);
        
        
        //Resistencias
        top1  = createTopWall (90, 180);
        down1 = createDownWall(90, 250);  
        
        top2  = createTopWall (500, 180);
        down2 = createDownWall(500, 250);  
            
        top3  = createTopWall (500, 380);
        down3 = createDownWall(500, 450);  
        
        
        //Tuberias Fijas
        createTopWall (0, 180);
        createDownWall(0, 250);

        createTopWall (120, 180);
        createDownWall(120, 250);      
        
        createTopWall (240, 180);
        createDownWall(180, 250);             
        
        createTopWall (360, 180);
        createDownWall(380, 250);        
        
        createTopWall (480, 180);
        createDownWall(480, 250);         
        
        createTopWall (600, 180);
        createDownWall(600, 250);
        
        createTopWall (720, 180);
        createDownWall(720, 250);
       
        //Tubo bajando
        
        createLeftWall(300, 250);
        createRightWall(370, 250);

        createLeftWall(300, 340);
        createRightWall(370, 270);
        
        //Tubo de abajo
        createDownWall(310, 450); 
        
        createTopWall (380, 380);
        createDownWall(360, 450);        
        
        createTopWall (480, 380);
        createDownWall(480, 450);         
        
        createTopWall (600, 380);
        createDownWall(600, 450);
        
        createTopWall (720, 380);
        createDownWall(720, 450);       
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow'        , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow'        , actionOnClickDown2, this, 2, 1, 0);
        buttonDown3 = game.add.button( xButtonDown3, yButtonDown3,  'arrow'        , actionOnClickDown3, this, 2, 1, 0);
    },

    update: function() {
        
       //Actualizador numeros
        textPoster1.text = cantPoster1 + ' Ohm';
        textPoster2.text = cantPoster2 + ' Ohm';
        textPoster3.text = cantPoster3 + ' Ohm';
        textPower1.text  = cantPower1  + ' Watt';

        resAct1 = cantPoster2;
        resAct2 = cantPoster3;
        resAct3 = cantPoster1;

        var r1     = cantPoster3;
        var r2     = cantPoster1;
        var r3     = cantPoster2;
        var r23    = 1 / ((1/r2) + (1/r3));
        var rTotal = r1 + r23;
        var vTotal = 20*limitTank;
        var iTotal = vTotal / rTotal;
        
         //Valores individuales
        
        var vr1  = iTotal * r1;
        var vr23 = iTotal * r23;
        var ir2  = vr23 /  r2;
        var ir3  = vr23 / r3;
        
        ampAct  = ir2;
        ampAct2 = ir3;
        ampAct3 = iTotal;
        
 
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 
        textRes3.text = resAct3+'/'+resTot3 + ' Ohm'; 

        textAmp.text  = ampAct.toFixed(1)  +'/'+ ampTot  + 'Amp'; 
        textAmp2.text = ampAct2.toFixed(1) +'/'+ ampTot2 + 'Amp'; 
        textAmp3.text = ampAct3.toFixed(1) +'/'+ ampTot3 + 'Amp'; 


        if (resAct1 == resTot1 && resAct2 == resTot2 && resAct3 == resTot3 && vTotal == 40) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel12, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");

        }


        //colisiones
        game.physics.arcade.collide(waterBalls, waterBalls);
        game.physics.arcade.collide(waterBalls2, waterBalls2);
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);

        var xPosBalls1 = 0;
        var yPosBalls1 = 220;
        var xPosBalls2 = 0;
        var yPosBalls2 = 210;
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1     , 200, -250 , 300, 100 , 0.8); 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1-10  , 200, -450 , 300, 100 , 0.8);    
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2    , 200,  450 , 300, -100, 0.8);
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2+10 , 200,  250 , 300, -100, 0.8);
              createBall++;
            }
        }
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls1;
                        sprite.position.y = yPosBalls1;
                        sprite.body.velocity.setTo(300, 100);
                    } else
                    {
                        makeItDown(sprite, 305, 190);
                    }
                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls2;
                        sprite.position.y = yPosBalls2;
                        sprite.body.velocity.setTo(300, -100);
                    }
                }
            });        
    },

};

//////////////////////////////////////////////////////////NIVEL 11///////////////////////////////////////////////////////

var mainState11 = {
  
    create: function() { 
        clean();
        updateLevel11();
        
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
        buttonTop3  = game.add.button( xButtonTop3,  yButtonTop3 ,  'button1', actionOnClickTop3,  this, 2, 1, 0);
    
        var text = game.add.text(350, 20, "Nivel 11");
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
        createTank(xTank,yTank);
         
        //Contadores        
        createPoster(510, 130);
        textPoster1 = game.add.text(518, 131, cantPoster1);
        
        createPoster(390, 330);
        textPoster2 = game.add.text(398, 331, cantPoster2);
       
        createMeter2(650,100);
        textRes1 = game.add.text(655, 131, resAct1+"/"+resTot1);
        textAmp =  game.add.text(655, 100, ampAct+"/"+ampTot);
        
        createPoster(530, 330);
        textPoster3 = game.add.text(538, 331, cantPoster3);
       
        createMeter2(650,300);
        textRes2 = game.add.text(655, 331, resAct2+"/"+resTot2);
        textAmp2 = game.add.text(655, 300, ampAct2+"/"+ampTot2);

        //Resistencias
        top1  = createTopWall (500, 180);
        down1 = createDownWall(500, 250);  
        
        top2  = createTopWall (380, 380);
        down2 = createDownWall(380, 450);  
            
        top3  = createTopWall (520, 380);
        down3 = createDownWall(520, 450);  
        
        
        //Tuberias Fijas
        createTopWall (0, 180);
        createDownWall(0, 250);

        createTopWall (120, 180);
        createDownWall(120, 250);      
        
        createTopWall (240, 180);
        createDownWall(180, 250);             
        
        createTopWall (360, 180);
        createDownWall(380, 250);        
        
        createTopWall (480, 180);
        createDownWall(480, 250);         
        
        createTopWall (600, 180);
        createDownWall(600, 250);
        
        createTopWall (720, 180);
        createDownWall(720, 250);
       
        //Tubo bajando
        
        createLeftWall(300, 250);
        createRightWall(370, 250);

        createLeftWall(300, 340);
        createRightWall(370, 270);
        
        //Tubo de abajo
        createDownWall(310, 450); 
        
        createTopWall (380, 380);
        createDownWall(360, 450);        
        
        createTopWall (480, 380);
        createDownWall(480, 450);         
        
        createTopWall (600, 380);
        createDownWall(600, 450);
        
        createTopWall (720, 380);
        createDownWall(720, 450);       
 
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow'        , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow'        , actionOnClickDown2, this, 2, 1, 0);
        buttonDown3 = game.add.button( xButtonDown3, yButtonDown3,  'arrow'        , actionOnClickDown3, this, 2, 1, 0); 
        
    },

    update: function() {
        

        //Actualizador numeros
        textPoster1.text = cantPoster1 + ' Ohm';
        textPoster2.text = cantPoster2 + ' Ohm';
        textPoster3.text = cantPoster3 + ' Ohm';


        resAct1 = cantPoster1;
        resAct2 = cantPoster2 + cantPoster3;


        var r1     = resAct1;
        var r2     = cantPoster2;
        var r3     = cantPoster3;
        var r23    = r2 + r3;
        var rTotal = 1 / ((1/r1) + (1/r23));
        var vTotal = 20*limitTank;
        var iTotal = vTotal / rTotal;
        
         //Valores individuales
         var ir1   = vTotal / r1;  //Imprimir en el medidor de arriba
         var ir23  = vTotal / r23; //Imprimir en el medidor de abajo
        
         var vr1  = ir1  * r1;
         var vr2  = ir23 * r2;
         var vr3  = ir23 * r3;


        ampAct  = ir1;
        ampAct2 = ir23;

        
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 

        textAmp.text  = ampAct.toFixed(1)  +'/'+ ampTot  + 'Amp'; 
        textAmp2.text = ampAct2.toFixed(1) +'/'+ ampTot2 + 'Amp'; 


        if (r1 == resTot1 && resTot2 == r23) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel11, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");

        }


        //Colisiones
        game.physics.arcade.collide(waterBalls, waterBalls);
        game.physics.arcade.collide(waterBalls2, waterBalls2); 
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);

        var xPosBalls1 = 0;
        var yPosBalls1 = 220;
        var xPosBalls2 = 0;
        var yPosBalls2 = 210;
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1     , 200, -250 , 300, 100 , 0.8); 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1-10  , 200, -450 , 300, 100 , 0.8);    
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2    , 200,  450 , 300, -100, 0.8);
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2+10 , 200,  250 , 300, -100, 0.8);
              createBall++;
            }
        }
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls1;
                        sprite.position.y = yPosBalls1;
                        sprite.body.velocity.setTo(300, 100);
                    } else
                    {
                        makeItDown(sprite, 305, 190);
                    }
                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls2;
                        sprite.position.y = yPosBalls2;
                        sprite.body.velocity.setTo(300, -100);
                    }
                }
            });        
    },

};

//////////////////////////////////////////////////////////NIVEL 10///////////////////////////////////////////////////////
var mainState10 = {
   
    create: function() { 
        clean();
        updateLevel10();
        
        //Todos los botones
        buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
        buttonLessPower = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow2', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);

        var text = game.add.text(350, 20, "Nivel 10");
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
        createTank(xTank,yTank);
         

        //Contadores
        textPower1 = game.add.text(18, 51, cantPower1);
        createPoster(10, 50);
        
        createMeter2(650,100);
        textRes1 = game.add.text(655, 131, resAct1+"/"+resTot1);
        textAmp =  game.add.text(655, 100, ampAct+"/"+ampTot);
        
        
        createPoster(510, 330);
        textPoster1 = game.add.text(518, 331, cantPoster1);
       
        createMeter2(650,300);
        textRes2 = game.add.text(655, 331, resAct2+"/"+resTot2);
        textAmp2 = game.add.text(655, 300, ampAct2+"/"+ampTot2);
        
        createMeter2(150,100);
        textRes3 = game.add.text(155, 131, resAct3+"/"+resTot3);
        textAmp3 = game.add.text(155, 100, ampAct3+"/"+ampTot3);
          
        
        //Resistencias
        top1  = createTopWall (500, 380);
        down1 = createDownWall(500, 450);  
        
        //Tuberias Fijas
        createTopWall (0, 180);
        createDownWall(0, 250);

        createTopWall (120, 180);
        createDownWall(120, 250);      
        
        createTopWall (240, 180);
        createDownWall(180, 250);             
        
        createTopWall (360, 180);
        createDownWall(380, 250);        
        
        createTopWall (480, 180);
        createDownWall(480, 250);         
        
        createTopWall (600, 180);
        createDownWall(600, 250);
        
        createTopWall (720, 180);
        createDownWall(720, 250);
       
        //Tubo bajando
        
        createLeftWall(300, 250);
        createRightWall(370, 250);

        createLeftWall(300, 340);
        createRightWall(370, 270);
        
        //Tubo de abajo
        createDownWall(310, 450); 
        
        createTopWall (380, 380);
        createDownWall(360, 450);        
        
        createTopWall (480, 380);
        createDownWall(480, 450);         
        
        createTopWall (600, 380);
        createDownWall(600, 450);
        
        createTopWall (720, 380);
        createDownWall(720, 450);       
        
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow'        , actionOnClickDown1, this, 2, 1, 0);
        
    },

    update: function() {
        
            
        //Actualizador numeros
        textPower1.text  = cantPower1 + ' Watt';
        textPoster1.text = cantPoster1 + ' Ohm';


        resAct2 = cantPoster1;
        resAct1 = cantPoster2;
        resAct3 = cantPoster3;
        
         var r1     = resAct3;
         var r2     = resAct1;
         var r3     = resAct2;
         var r23    = 1 / ((1/r2) + (1/r3));
         var rTotal = r1 + r23;
         var vTotal = 20*limitTank;
         var iTotal = vTotal / rTotal;
        
         //Valores individuales
        
         var vr1  = iTotal * r1;
         var vr23 = iTotal * r23;
         var ir2  = vr23 /  r2;
         var ir3  = vr23 / r3;
        
        ampAct  = ir2;
        ampAct2 = ir3;
        ampAct3 = iTotal;
        
        
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 
        textRes3.text = resAct3+'/'+resTot3 + ' Ohm'; 
        
        textAmp.text  = ampAct.toFixed(1)  +'/'+ ampTot  + 'Amp'; 
        textAmp2.text = ampAct2.toFixed(1) +'/'+ ampTot2 + 'Amp'; 
        textAmp3.text = ampAct3.toFixed(1) +'/'+ ampTot3 + 'Amp'; 
                    
         if (r3 == resTot2 && vTotal == 60) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel10, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");  
         }
        
        
        
        //Colisiones
        game.physics.arcade.collide(waterBalls2, waterBalls2);
        game.physics.arcade.collide(waterBalls, waterBalls); 
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);
        var xPosBalls1 = 0;
        var yPosBalls1 = 220;
        var xPosBalls2 = 0;
        var yPosBalls2 = 210;
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1     , 200, -250 , 300, 100 , 0.8); 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1-10  , 200, -450 , 300, 100 , 0.8);    
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2    , 200,  450 , 300, -100, 0.8);
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2+10 , 200,  250 , 300, -100, 0.8);
              createBall++;
            }
        }
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls1;
                        sprite.position.y = yPosBalls1;
                        sprite.body.velocity.setTo(300, 100);
                    } else
                    {
                        makeItDown(sprite, 305, 190);
                    }
                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls2;
                        sprite.position.y = yPosBalls2;
                        sprite.body.velocity.setTo(300, -100);
                    }
                }
            });        
    },

};

//////////////////////////////////////////////////////////NIVEL 9///////////////////////////////////////////////////////
var mainState9 = {

    create: function() { 
        clean();
        updateLevel9();
      
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);

        var text = game.add.text(350, 20, "Nivel 9");
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
        createTank(-25,90);
         
        //Contadores
        createPoster(510, 130);
        textPoster1 = game.add.text(518, 131, cantPoster1);
       

        createMeter2(650,100);
        textRes1 = game.add.text(655, 131, resAct1+"/"+resTot1);
        textAmp =  game.add.text(655, 100, ampAct+"/"+ampTot);

        createPoster(510, 330);
        textPoster2 = game.add.text(518, 331, cantPoster2);
       
        createMeter2(650,300);
        textRes2 = game.add.text(655, 331, resAct1+"/"+resTot1);
        textAmp2 = game.add.text(655, 300, ampAct+"/"+ampTot);

        createMeter2(150,100);
        textRes3 = game.add.text(155, 131, resAct3+"/"+resTot3);
        textAmp3 = game.add.text(155, 100, ampAct+"/"+ampTot);

   
        //Resistencias
        top1  = createTopWall (500, 180);
        down1 = createDownWall(500, 250);  
            
        top2  = createTopWall (500, 380);
        down2 = createDownWall(500, 450);  
        
        
        //Tuberias Fijas
        createTopWall (0, 180);
        createDownWall(0, 250);

        createTopWall (120, 180);
        createDownWall(120, 250);      
        
        createTopWall (240, 180);
        createDownWall(180, 250);             
        
        createTopWall (360, 180);
        createDownWall(380, 250);        
        
        createTopWall (480, 180);
        createDownWall(480, 250);         
        
        createTopWall (600, 180);
        createDownWall(600, 250);
        
        createTopWall (720, 180);
        createDownWall(720, 250);
       
        //Tubo bajando
        
        createLeftWall(300, 250);
        createRightWall(370, 250);

        createLeftWall(300, 340);
        createRightWall(370, 270);
        
        //Tubo de abajo
        createDownWall(310, 450); 
        
        createTopWall (380, 380);
        createDownWall(360, 450);        
        
        createTopWall (480, 380);
        createDownWall(480, 450);         
        
        createTopWall (600, 380);
        createDownWall(600, 450);
        
        createTopWall (720, 380);
        createDownWall(720, 450);       
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow', actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown1, yButtonDown2 , 'arrow', actionOnClickDown2, this, 2, 1, 0);
          
    },

    update: function() {
                        
        //Actualizador numeros

        textPoster1.text = cantPoster1 + ' Ohm';
        textPoster2.text = cantPoster2 + ' Ohm';

        resAct1 = cantPoster1;
        resAct2 = cantPoster2;

         // Valores totales
         var r1     = resAct3;
         var r2     = resAct1;
         var r3     = resAct2;
         var r23    = 1 / ((1/r2) + (1/r3));
         var rTotal = r1 + r23;
         var vTotal = 20;
         var iTotal = vTotal / rTotal;
        
         //Valores individuales
        
         var vr1  = iTotal * r1;
         var vr23 = iTotal * r23;
         var ir2  = vr23 /  r2;
         var ir3  = vr23 / r3;
        
        ampAct  = ir2;
        ampAct2 = ir3;
        ampAct3 = iTotal;
        
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 
        textRes3.text = resAct3+'/'+resTot3 + ' Ohm'; 
        
        textAmp.text  = ampAct.toFixed(1)  +'/'+ ampTot  + 'Amp'; 
        textAmp2.text = ampAct2.toFixed(1) +'/'+ ampTot2 + 'Amp'; 
        textAmp3.text = ampAct3.toFixed(1) +'/'+ ampTot3 + 'Amp'; 
                    
    
        if (r2 == resTot1 && r3 == resTot2) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel9, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
        }

 
        //Coliciones
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);
        game.physics.arcade.collide(waterBalls2, waterBalls2); 
        game.physics.arcade.collide(waterBalls, waterBalls); 
        
        var xPosBalls1 = 0;
        var yPosBalls1 = 220;
        var xPosBalls2 = 0;
        var yPosBalls2 = 210;
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1     , 200, -250 , 300, 100 , 0.8); 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1-10  , 200, -450 , 300, 100 , 0.8);    
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2    , 200,  450 , 300, -100, 0.8);
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2+10 , 200,  250 , 300, -100, 0.8);
              createBall++;
            }
        }
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls1;
                        sprite.position.y = yPosBalls1;
                        sprite.body.velocity.setTo(300, 100);
                    } else
                    {
                        makeItDown(sprite, 305, 190);
                    }
                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls2;
                        sprite.position.y = yPosBalls2;
                        sprite.body.velocity.setTo(300, -100);
                    }
                }
            });        
    },

};


//////////////////////////////////////////////////////////NIVEL 8///////////////////////////////////////////////////////
var mainState8 = {

    create: function() { 
        clean();
        updateLevel8();
        
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
        
        var text = game.add.text(350, 20, "Nivel 8");
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
        createTank(xTank,yTank);
         

        //Contadores    
        createPoster(100, 130);
        textPoster1 = game.add.text(108, 131, cantPoster1);
       
        createMeter2(645,100);
        textRes1 = game.add.text(650, 131, resAct1+"/"+resTot1);
        textAmp =  game.add.text(650, 100, ampAct+"/" +ampTot);
        
        createPoster(510, 130);
        textPoster2 = game.add.text(518, 131, cantPoster2);
       
        createMeter2(645,300);
        textRes2 = game.add.text(650, 331, resAct1+"/"+resTot1);
        textAmp2 = game.add.text(650, 300, ampAct2+"/"+ampTot2);
     
        
        createMeter2(220,100);
        textRes3 = game.add.text(225, 131, resAct3+"/"+resTot3);
        textAmp3 = game.add.text(225, 100, ampAct3+"/"+ampTot3);
        
        //Resistencias
        top1  = createTopWall (90, 180);
        down1 = createDownWall(90, 250);  
            
        top2  = createTopWall (500, 180);
        down2 = createDownWall(500, 250);  
        
        
        //Tuberias Fijas
        createTopWall (0, 180);
        createDownWall(0, 250);

        createTopWall (120, 180);
        createDownWall(120, 250);      
        
        createTopWall (240, 180);
        createDownWall(180, 250);             
        
        createTopWall (360, 180);
        createDownWall(380, 250);        
        
        createTopWall (480, 180);
        createDownWall(480, 250);         
        
        createTopWall (600, 180);
        createDownWall(600, 250);
        
        createTopWall (720, 180);
        createDownWall(720, 250);
       
        //Tubo bajando
        
        createLeftWall(300, 250);
        createRightWall(370, 250);

        createLeftWall(300, 340);
        createRightWall(370, 270);
        
        //Tubo de abajo
        createDownWall(310, 450); 
        
        createTopWall (380, 380);
        createDownWall(360, 450);        
        
        createTopWall (480, 380);
        createDownWall(480, 450);         
        
        createTopWall (600, 380);
        createDownWall(600, 450);
        
        createTopWall (720, 380);
        createDownWall(720, 450);       
    
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow'        , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow'        , actionOnClickDown2, this, 2, 1, 0);
        
    },

    update: function() {
        
        
        //Actualizador numeros

        textPoster1.text = cantPoster1 + ' Ohm';
        textPoster2.text = cantPoster2 + ' Ohm';

        resAct3 = cantPoster1;
        resAct1 = cantPoster2;
        
                 // Valores totales
         var r1     = resAct3;
         var r2     = resAct1;
         var r3     = resAct2;
         var r23    = 1 / ((1/r2) + (1/r3));
         var rTotal = r1 + r23;
         var vTotal = 20;
         var iTotal = vTotal / rTotal;
        
         //Valores individuales
        
         var vr1  = iTotal * r1;
         var vr23 = iTotal * r23;
         var ir2  = vr23 /  r2;
         var ir3  = vr23 / r3;
        
        ampAct  = ir2;
        ampAct2 = ir3;
        ampAct3 = iTotal;
        
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 
        textRes3.text = resAct3+'/'+resTot3 + ' Ohm'; 
        
        textAmp.text  = ampAct.toFixed(1)  +'/'+ ampTot  + 'Amp'; 
        textAmp2.text = ampAct2.toFixed(1) +'/'+ ampTot2 + 'Amp'; 
        textAmp3.text = ampAct3.toFixed(1) +'/'+ ampTot3 + 'Amp'; 
                    
        if (r1 == resTot3 && r2 == resTot1) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel8, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
        }


        //Colisiones
        game.physics.arcade.collide(waterBalls2, waterBalls2);
        game.physics.arcade.collide(waterBalls, waterBalls); 
        game.physics.arcade.collide(waterBalls, corners);
        game.physics.arcade.collide(waterBalls, pipes);
        game.physics.arcade.collide(waterBalls2, corners);
        game.physics.arcade.collide(waterBalls2, pipes);
        var xPosBalls1 = 0;
        var yPosBalls1 = 220;
        var xPosBalls2 = 0;
        var yPosBalls2 = 210;
        if(frecuency % 11 == 0)
        {
            if(createBall < 22)
            {
                //i,  j, gravityX, gravityY, velocityX, velocityY, bounce) 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1     , 200, -250 , 300, 100 , 0.8); 
              createWaterBall(waterBalls , xPosBalls1, yPosBalls1-10  , 200, -450 , 300, 100 , 0.8);    
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2    , 200,  450 , 300, -100, 0.8);
              createWaterBall(waterBalls2 , xPosBalls2, yPosBalls2+10 , 200,  250 , 300, -100, 0.8);
              createBall++;
            }
        }
        frecuency++;
        waterBalls.forEach(function(sprite) {
    
            
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls1;
                        sprite.position.y = yPosBalls1;
                        sprite.body.velocity.setTo(300, 100);
                    } else
                    {
                       makeItDown(sprite, 305, 190);
                    }
                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = xPosBalls2;
                        sprite.position.y = yPosBalls2;
                        sprite.body.velocity.setTo(300, -100);
                    }
                }
            });        
    },

};

function makeItDown(sprite, xPos, yPos)
{                      
    if(sprite.position.x > xPos && sprite.position.x < xPos + 60 && sprite.position.y > yPos && sprite.position.y < yPos + 60)
    {
        sprite.body.gravity.set(200, 500);
        sprite.body.velocity.setTo(300*limitTank, 500*limitTank);
    }

    if(sprite.position.x > xPos && sprite.position.x < xPos + 60 && sprite.position.y >= yPos + 60 && sprite.position.y < yPos + 80)
    {
        sprite.body.gravity.set(300, 200);
        sprite.body.velocity.setTo(300*limitTank, 200*limitTank);
    }
}

//////////////////////////////////////////////////////////NIVEL 7///////////////////////////////////////////////////////
var mainState7 = {

    create: function() { 
        clean();
        updateLevel7();
        
        //Todos los botones
        buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
        buttonLessPower2 = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow2', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
        buttonTop3  = game.add.button( xButtonTop3,  yButtonTop3 ,  'button1', actionOnClickTop3,  this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 7");
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
        createTank(xTank, yTank);
         
        
        //Contadores
        createPoster(10, 140);
        textPower1 = game.add.text(18, 141, cantPower1);
        
        createPoster(100, 220);
        textPoster1 = game.add.text(108, 221, cantPoster1);
        
        createPoster(380, 220);
        textPoster2 = game.add.text(388, 221, cantPoster2);
   
        createPoster(530, 220);
        textPoster3 = game.add.text(538, 221, cantPoster3);
        

        createMeter2(220,190);
        textRes1 = game.add.text(225, 221, resAct1+"/"+resTot1);
        textAmp =  game.add.text(225, 190, ampAct+"/"+ampTot);
        
        createMeter2(650,190);
        textRes2 = game.add.text(655, 221, resAct2+"/"+resTot2);
        textAmp2 =  game.add.text(655, 190, ampAct+"/"+ampTot);
        
        
        //Resistencias
        top1  = createTopWall (90, 270);
        down1 = createDownWall(90, 340);  
       
        top2  = createTopWall (370, 270);
        down2 = createDownWall(370, 340);  
   
        top3  = createTopWall (520, 270);
        down3 = createDownWall(520, 340);  
        
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
        
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow' , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow' , actionOnClickDown2, this, 2, 1, 0);
        buttonDown3 = game.add.button( xButtonDown3, yButtonDown3,  'arrow' , actionOnClickDown3, this, 2, 1, 0);
           
    },

    update: function() {
        

        //Actualizador numeros
        textPower1.text  = cantPower1 + ' Watt';
        textPoster1.text = cantPoster1 + ' Ohm';
        textPoster2.text = cantPoster2 + ' Ohm';
        textPoster3.text = cantPoster3 + ' Ohm';

        resAct1 = cantPoster1;
        resAct2 = cantPoster1 + cantPoster2 + cantPoster3;
        
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 
         
        ampAct = cantPower1/resAct2 + 0.2;
        textAmp.text  = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
        textAmp2.text = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
        
        
        if ((resAct1 == resTot1) && (resAct2 == resTot2) && (ampAct.toFixed(1) == ampTot)) { 
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel7, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
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

//////////////////////////////////////////////////////////NIVEL 6///////////////////////////////////////////////////////
var mainState6 = {

    preload: cargarTodo,
    
    create: function() { 
        clean();
        updateLevel6();
        
        //Todos los botones
        buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
        buttonLessPower2 = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow2', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 6");
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
        createTank(xTank, yTank);
         
        
        //Contadores
        createPoster(10, 140);
        textPower1 = game.add.text(18, 141, cantPower1);
        
        createPoster(190, 220);
        textPoster1 = game.add.text(198, 221, cantPoster1);
        
        createPoster(510, 220);
        textPoster2 = game.add.text(518, 221, cantPoster2);
       
               
        createMeter2(340,190);
        textRes1 = game.add.text(345, 221, resAct1+"/"+resTot1);
        textAmp =  game.add.text(345, 190, ampAct+"/"+ampTot);
        
        createMeter2(645,190);
        textRes2 = game.add.text(650, 221, resAct1+"/"+resTot1);
        textAmp2 =  game.add.text(650, 190, ampAct+"/"+ampTot);

        
        //Resistencias
        top1  = createTopWall (180, 270);
        down1 = createDownWall(180, 340);  
       
        top2  = createTopWall (500, 270);
        down2 = createDownWall(500, 340);  

        
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
        
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow' , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow' , actionOnClickDown2, this, 2, 1, 0);
        
    },

    update: function() {
        


        //Actualizador numeros
        textPower1.text  = cantPower1 + ' Watt';
        textPoster1.text = cantPoster1 + ' Ohm'; 
        textPoster2.text = cantPoster2 + ' Ohm'; 
        
        resAct1 = cantPoster1;
        resAct2 =  cantPoster1 + cantPoster2;
        
        textRes1.text = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text = resAct2+'/'+resTot2 + ' Ohm'; 

        ampAct = cantPower1/resAct2 - 0.7;
        
        if (ampAct < 0) ampAct = 0.1;
        
        textAmp.text  = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
        textAmp2.text = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 

        if ((resAct1 == resTot1) && (resAct2 == resTot2) && (ampAct.toFixed(1) == ampTot)) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel6, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
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
                        sprite.body.velocity.setTo(300*limitTank, 100*limitTank);
                    }
                    manageSpeed(sprite);
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = 0;
                        sprite.position.y = 300;
                        sprite.body.velocity.setTo(300*limitTank, -100*limitTank);
                    }
                    manageSpeed2(sprite);
                }
            });
        changeTank = false;
    },

};

//////////////////////////////////////////////////////////NIVEL 5///////////////////////////////////////////////////////
var mainState5 = {

    preload:cargarTodo,

    create: function() { 
        clean();
        updateLevel5();
        buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
        buttonLessPower = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow2', actionOnClickLessPower, this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);

        var text = game.add.text(350, 20, "Nivel 5");
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
        createTank(xTank,yTank);
         
        //Resistencias
        top1  = createTopWall (300, 270);
        down1 = createDownWall(300, 340);  
        
        
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
        
        //Contadores
        createMeter2(550,190);
        textRes1 = game.add.text(555, 221, resAct1+"/"+resTot1);
        textAmp =  game.add.text(555, 190, ampAct+"/"+ampTot);
                
        textPower1 = game.add.text(18, 141, cantPower1);
        createPoster(10, 140);
        
        createPoster(310,220);
        textPoster1 = game.add.text(318, 221, cantPoster1);
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow' , actionOnClickDown1, this, 2, 1, 0);
            
    },

    update: function() {
     

        //Actualizador numeros
        textPoster1.text = cantPoster1 + ' Ohm'; 
        textPower1.text  = cantPower1 + ' Watt';
      
        resAct1 = cantPoster1;
        textRes1.text    = resAct1+'/'+resTot1 + ' Ohm'; 
         
        ampAct = cantPower1/cantPoster1 -1.7;
       
        if (ampAct < 0) ampAct = 0.1;
        textAmp.text   = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
        
        if ((resAct1 == resTot1) && (ampAct.toFixed(1) == ampTot)) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel5, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
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
                        sprite.body.velocity.setTo(300*limitTank, 100*limitTank);
                    }
                    manageSpeed(sprite);                    
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = 0;
                        sprite.position.y = 300;
                        sprite.body.velocity.setTo(300*limitTank, -100*limitTank);
                    }
                    manageSpeed2(sprite);
                }
            });
        changeTank = false;
    },

};


//////////////////////////////////////////////////////////NIVEL 4///////////////////////////////////////////////////////
var mainState4 = {
    preload: cargarTodo,

    create: function() { 
        clean();
        updateLevel4();
        
        buttonMorePower = game.add.button(xButtonMorePower, yButtonMorePower, 'arrow', actionOnClickMorePower, this, 2, 1, 0);
        buttonLessPower = game.add.button(xButtonLessPower, yButtonLessPower, 'arrow2', actionOnClickLessPower, this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 4");
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
        createTank(xTank,yTank);
         

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
        
        //Contadores    
        createMeter2(550,190);
        textRes1 = game.add.text(555, 221, resAct1+"/"+resTot1);
        textAmp = game.add.text(555, 190, ampAct+"/"+ampTot);
            
        textPower1 = game.add.text(18, 141, cantPower1);
        createPoster(10, 140);
        
        
    },

    update: function() {
        
        //Actualizador numeros
        textPower1.text    = cantPower1 + ' Watt';
        textRes1.text      = resAct1+'/'+resTot1 + ' Ohm'; 
        ampAct = cantPower1/60;
        textAmp.text   = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
        
        if (ampAct.toFixed(1) == ampTot) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel4, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
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
                        sprite.body.velocity.setTo(300*limitTank, 100*limitTank);
                    }                    
                    manageSpeed(sprite);
                }
            });

        waterBalls2.forEach(function(sprite) {
    
                if (sprite) { 
                    if(!sprite.alive) {
                        sprite.alive = true;
                        sprite.position.x = 0;
                        sprite.position.y = 300;
                        sprite.body.velocity.setTo(300*limitTank, -100*limitTank);
                    }
                    manageSpeed2(sprite);
                }
            });
            changeTank = false;
    
    },

};

//////////////////////////////////////////////////////////NIVEL 3///////////////////////////////////////////////////////
var mainState3 = {

    preload: cargarTodo,

    create: function() { 
        
        clean();
        updateLevel3();   
        
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop2  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
        buttonTop3  = game.add.button( xButtonTop3,  yButtonTop3 ,  'button1', actionOnClickTop3,  this, 2, 1, 0);
           
        var text = game.add.text(350, 20, "Nivel 3");
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
        
        createPoster(110, 220);
        textPoster1 = game.add.text(118, 221, cantPoster1);
        
        createPoster(390, 220);
        textPoster2 = game.add.text(398, 221, cantPoster2);
   
        createPoster(535, 220);
        textPoster3 = game.add.text(543, 221, cantPoster3);
        
        createMeter2(235,190);
        textRes1 = game.add.text(240, 221, resAct1+"/"+resTot1);
        textAmp =  game.add.text(240, 190, ampAct+"/"+ampTot);
        
        createMeter2(650,190);
        textRes2 = game.add.text(655, 221, resAct2+"/"+resTot2);
        textAmp2 = game.add.text(655, 190, ampAct+"/"+ampTot);

        
        //Resistencias
        top1  = createTopWall (100, 270);
        down1 = createDownWall(100, 340);  
       
        top2  = createTopWall (380, 270);
        down2 = createDownWall(380, 340);  
   
        top3  = createTopWall (525, 270);
        down3 = createDownWall(525, 340);  
        
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
        
        
        buttonDown1 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow' , actionOnClickDown1, this, 2, 1, 0);
        buttonDown2 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow' , actionOnClickDown2, this, 2, 1, 0);
        buttonDown3 = game.add.button( xButtonDown3, yButtonDown3,  'arrow' , actionOnClickDown3, this, 2, 1, 0);

        
    },

    update: function() {
        
        //Actualizador numeros
        textPoster1.text  = cantPoster1 + ' Ohm'; 
        textPoster2.text  = cantPoster2 + ' Ohm'; 
        textPoster3.text  = cantPoster3 + ' Ohm'; 
        resAct1 = cantPoster1;
        resAct2 = cantPoster2 + cantPoster3 + cantPoster1;
        textRes1.text      = resAct1+'/'+resTot1 + ' Ohm'; 
        textRes2.text      = resAct2+'/'+resTot2 + ' Ohm';
        

         ampAct = 60/resAct2 -0.3;
         textAmp.text   = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
         textAmp2.text  = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
        
 
        if ((resAct1 == resTot1) && (resAct2 == resTot2) && (ampAct.toFixed(1) == ampTot)) {
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel3, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
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

//////////////////////////////////////////////////////////NIVEL 2///////////////////////////////////////////////////////
var mainState2 = {

    preload: cargarTodo,

    create: function() { 
        clean();
        updateLevel2(); 

        buttonTop2  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
        buttonTop1  = game.add.button( xButtonTop2,  yButtonTop2 ,  'button1', actionOnClickTop2,  this, 2, 1, 0);
       
           
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
        createPoster(190, 220);
        textPoster1 = game.add.text(198, 221, cantPoster1);
        
        createPoster(460, 220);
        textPoster2 = game.add.text(468, 221, cantPoster2);
   
        
        createMeter2(650,190);
        textRes1 = game.add.text(655, 221, resAct1+"/"+resTot1);
        textAmp = game.add.text(655, 190, ampAct+"/"+ampTot);
        
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
        
        buttonDown2 = game.add.button( xButtonDown1, yButtonDown1 , 'arrow' , actionOnClickDown1, this, 2, 1, 0);
        buttonDown1 = game.add.button( xButtonDown2, yButtonDown2 , 'arrow' , actionOnClickDown2, this, 2, 1, 0);
        
    },

    update: function() {
        
        //Actualizador numeros
        textPoster1.text  = cantPoster1 + ' Ohm'; 
        textPoster2.text  = cantPoster2 + ' Ohm';
        resAct = cantPoster1 + cantPoster2;
        textRes1.text  = resAct +'/'+resTot1  + ' Ohm'; 
           
        ampAct = (40/resAct) -0.1;
        textAmp.text  = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
          
        if ( ((cantPoster1 + cantPoster2) == resTot1) && (ampAct.toFixed(1) == ampTot)){
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel2, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
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
                        sprite.body.velocity.setTo(250, 130);
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
        changeTank = false;
    },
};

function cargarTodo() { 
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
        game.load.image('arrow2'       , 'assets/arrow2.png');
        game.load.image('poster'       , 'assets/poster.png');
        game.load.image('poster2'      , 'assets/poster2.png');
        game.load.image('meter'        , 'assets/meter.png');
        game.load.image('meter2'       , 'assets/meter2.png');
        game.load.image('meter3'       , 'assets/meter3.png');
        game.load.image('block'        , 'assets/Block.png');

 }
//////////////////////////////////////////////////////////NIVEL 1///////////////////////////////////////////////////////
var mainState = {


    preload: cargarTodo,
   
    create: function() { 
 
        buttonTop1  = game.add.button( xButtonTop1,  yButtonTop1 ,  'button1', actionOnClickTop1,  this, 2, 1, 0);
           
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
        createPoster(250, 220);
        textPoster1 = game.add.text(258, 221, cantPoster1);
       
        createMeter2(500,190);
        textRes = game.add.text(505, 221, resAct+"/"+resTot);
        textAmp = game.add.text(505, 190, ampAct+"/"+ampTot);

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

        
    },

    update: function() {
        
        textPoster1.text  = cantPoster1 + ' Ohm';
        resAct = cantPoster1;
        textRes.text  = resAct+'/'+resTot + ' Ohm'; 
        ampAct = 20/resAct;
        textAmp.text  = ampAct.toFixed(1) +'/'+ampTot + ' Amp'; 
    
        //Actualizador numeros
        if(resAct == resTot && ampAct == ampTot)
        { 
            if (showTitle) {
                textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'48px', fontSize: '18px', fill: '#000' });
            }
            showTitle = false;
            button = game.add.button( 350, 290 , 'poster2', victoryLevel1, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente"); 
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

function manageSpeed(sprite)
{
    if(changeTank)
    {
        if(limitTank == 1)
        {
            sprite.body.velocity.setTo(300, 100);
        }
        if(limitTank == 2)
        {
            sprite.body.velocity.setTo(300*limitTank, 100*limitTank);
        }
        if(limitTank == 3)
        {
            sprite.body.velocity.setTo(300*limitTank, 100*limitTank);
        }
    }
}

function manageSpeed2(sprite)
{
    if(changeTank)
    {
        if(limitTank == 1)
        {
            sprite.body.velocity.setTo(300, -100);
        }
        if(limitTank == 2)
        {
            sprite.body.velocity.setTo(300*2, -100*2);
        }
        if(limitTank == 3)
        {
            sprite.body.velocity.setTo(300*3, -100*3);
        }
    }
}

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

function createTank(i, j){-100
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
    
   // game.debug.text(cantPoster1,278, 221 );
   // text2 = game.add.text(278, 221, cantPoster1);
}

function createMeter(i, j){
    var poster = posters.create(i, j, 'meter');
    poster.body.immovable = true; 
}

function createMeter2(i, j){
    var poster = posters.create(i, j, 'meter2');
    poster.body.immovable = true; 
}

function createMeter3(i, j){
    var poster = posters.create(i, j, 'meter3');
    poster.body.immovable = true; 
}

function actionOnClickTop1 () 
{        
    if (limit1 < 3) {
        down1.scale.y    += 0.75;
        down1.position.y -= 7.5;
        top1.scale.y     += 0.75;
        limit1           += 1; 
        cantPoster1      += cantResistancia;
    }
}

function actionOnClickDown1 () 
{
    if (limit1 > 0) {
        down1.scale.y    -= 0.75;
        down1.position.y += 7.5;
        top1.scale.y     -= 0.75;
        limit1           -=1; 
        cantPoster1      -= cantResistancia;
    }     
}

function actionOnClickTop2 () 
{
    if (limit2 < 3) {
        down2.scale.y    += 0.75;
        down2.position.y -= 7.5;
        top2.scale.y     += 0.75;
        limit2           += 1; 
        cantPoster2      += cantResistancia;
    }
}

function actionOnClickDown2 () 
{
    if (limit2 > 0) {
        down2.scale.y    -= 0.75;
        down2.position.y += 7.5;
        top2.scale.y     -= 0.75;
        limit2           -= 1; 
        cantPoster2      -= cantResistancia;
    }
}

function actionOnClickTop3 () 
{
    if (limit3 < 3) {
        down3.scale.y    += 0.75;
        down3.position.y -= 7.5;
        top3.scale.y     += 0.75;
        limit3           += 1; 
        cantPoster3      += cantResistancia;
    }
}

function actionOnClickDown3 () 
{
    if (limit3 > 0) {
        down3.scale.y    -= 0.75;
        down3.position.y += 7.5;
        top3.scale.y     -= 0.75;
        limit3           -= 1; 
        cantPoster3      -= cantResistancia;
    }
}

function actionOnClickTop4 () 
{
    if (limit4 < 3) {
        down4.scale.y    += 0.75;
        down4.position.y -= 7.5;
        top4.scale.y     += 0.75;
        limit4           += 1; 
        cantPoster4      += cantResistancia;
    }
}

function actionOnClickDown4 () 
{
    if (limit4 > 0) {
        down4.scale.y    -= 0.75;
        down4.position.y += 7.5;
        top4.scale.y     -= 0.75;
        limit4           -= 1; 
        cantPoster4      -= cantResistancia;
    }
}

function actionOnClickTop5 () 
{
    if (limit5 < 3) {
        down5.scale.y    += 0.75;
        down5.position.y -= 7.5;
        top5.scale.y     += 0.75;
        limit5           += 1; 
        cantPoster5      += cantResistancia;
    }
}

function actionOnClickDown5 () 
{
    if (limit5 > 0) {
        down5.scale.y    -= 0.75;
        down5.position.y += 7.5;
        top5.scale.y     -= 0.75;
        limit5           -= 1; 
        cantPoster5      -= cantResistancia;
    }
}

function actionOnClickMorePower ()
{
   if (limitTank < 3) {

        if (limitTank == 1) {
            var tank = tanks.create(xTank, yTank, 'tank2');
            tank.body.immovable = true;       
        }
       
        if (limitTank == 2) {
            var tank = tanks.create(xTank, yTank, 'tank3');
            tank.body.immovable = true;   
        }  
        limitTank += 1;
        changeTank = true;
        cantPower1 = cantPower1 + 20;
    }
}

function actionOnClickLessPower ()
{
    if (limitTank > 1) {

        if (limitTank == 2) {
            var tank = tanks.create(xTank, yTank, 'tank1');
            tank.body.immovable = true;   
        }
       
        if (limitTank == 3) {
            var tank = tanks.create(xTank, yTank, 'tank2');
            tank.body.immovable = true;   
        }
        limitTank -= 1;
        changeTank = true;
        cantPower1 = cantPower1 - 20;
    }
}

function clean ()
{
    limit1 = 0;
    limit2 = 0;
    limit3 = 0;
    limit4 = 0;
    limit5 = 0; 
    limitTank = 1;
    createBall= 0;
    frecuency= 0;
    showTitle = true;
    changeTank = false; 
}

function victoryLevel2 ()
{            
    this.state.start('main3');
}

function victoryLevel3 ()
{            
    this.state.start('main4');
}

function victoryLevel4 ()
{            
    this.state.start('main5');
}

function victoryLevel5 ()
{            
    this.state.start('main6');
}

function victoryLevel6 ()
{            
    this.state.start('main7');
}

function victoryLevel7 ()
{            
    this.state.start('main8');
}

function victoryLevel8 ()
{            
    this.state.start('main9');
}

function victoryLevel9 ()
{            
    this.state.start('main10');
}

function victoryLevel10 ()
{            
    this.state.start('main11');
}

function victoryLevel11 ()
{            
    this.state.start('main12');
}

function victoryLevel12 ()
{            
    this.state.start('main13');
}

function victoryLevel13 ()
{            
    this.state.start('main14');
}

function victoryLevel14 ()
{            
    this.state.start('main15');
}

function victoryLevel15 ()
{            
    this.state.start('main16');
}


function winnerState () {

        textWinner = game.add.text(350, 150, "¡GANASTE!", { size:'458px', fontSize: '128px', fill: '#000' });
        cursors = game.input.keyboard.createCursorKeys();
        
        if (siguienteNivel == 2) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel1, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel2();
             
        } else if (siguienteNivel == 3) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel2, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel3();

        } else if (siguienteNivel == 4) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel3, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel4();
            
        } else if (siguienteNivel == 5) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel4, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel5();
            
        } else if (siguienteNivel == 6) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel5, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel6();
            
        } else if (siguienteNivel == 7) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel6, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel7();
            
        } else if (siguienteNivel == 8) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel7, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel8();
            
        } else if (siguienteNivel == 9) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel8, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel9();
               
        } else if (siguienteNivel == 10) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel9, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel10();

        } else if (siguienteNivel == 11) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel10, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel11();

        } else if (siguienteNivel == 12) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel11, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel12();
            
        } else if (siguienteNivel == 13) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel12, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel13();
            
        } else if (siguienteNivel == 14) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel13, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel14();
            
        } else if (siguienteNivel == 15) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel14, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            updateLevel15();
            
        } else if (siguienteNivel == 16) {
            button = game.add.button( 350, 290 , 'poster2', victoryLevel15, this, 2, 1, 0); 
            textButton = game.add.text(360, 292, "Siguiente");
            siguienteNivel +=1;
            clean();
            //updateLevel16();
            
        }   
        
        


}

function updateLevel15 () {
 
    xButtonTop1  = 210, xButtonTop2  = 520, xButtonTop3  = 210, xButtonTop4  = 400, xButtonTop5  = 520;
    yButtonTop1  = 290, yButtonTop2  = 290, yButtonTop3  = 90, yButtonTop4  = 490, yButtonTop5  = 490;

    xButtonDown1 = 265, xButtonDown2 = 575, xButtonDown3 = 265, xButtonDown4 = 455, xButtonDown5 = 575;
    yButtonDown1 = 270, yButtonDown2 = 270, yButtonDown3 = 70, yButtonDown4 = 470, yButtonDown5 = 470;

    xButtonMorePower = 80, xButtonLessPower = 80;
    yButtonMorePower = 190, yButtonLessPower = 240;
    var xTank= -25, yTank= 180; 
    
    cantPower1 = 20, cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 5,  cantPoster4 = 5,  cantPoster5 = 5;
    resTot1 = 20, resTot2 = 20, resTot3 = 10, resTot4 = 10, resTot5 = 800;
    resAct1 = cantPoster2, resAct2 = cantPoster5, resAct3=  cantPoster1, resAct4 = cantPoster3, resAct5=  890; 
    ampTot = 1.0, ampTot2 = 1.5,  ampTot3 = 1.7, ampTot4 = 1.5, ampTot5 = 1.4;

}

function updateLevel14 () {
  
    xButtonTop1  = 220, xButtonTop2  = 520, xButtonTop3  = 250, xButtonTop4  = 400, xButtonTop5  = 520;
    yButtonTop1  = 290, yButtonTop2  = 290, yButtonTop3  = 490, yButtonTop4  = 490, yButtonTop5  = 490;

    xButtonDown1 = 275, xButtonDown2 = 575, xButtonDown3 = 305, xButtonDown4 = 455, xButtonDown5 = 575;
    yButtonDown1 = 270, yButtonDown2 = 270, yButtonDown3 = 470, yButtonDown4 = 470, yButtonDown5 = 470;


    xButtonMorePower = 80, xButtonLessPower = 80;
    yButtonMorePower = 200, yButtonLessPower = 250;

    xTank= -25, yTank= 190; 

    cantPower1 = 20, cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 0,  cantPoster4 = 0,  cantPoster5 = 5;
    resTot1 = 10, resTot2 = 20, resTot3 = 10, resTot4 = 5, resAct1 = 5, resAct2 = 5, resAct3=  cantPoster1, resAct4=  5;
    ampTot = 1.7, ampTot2 = 1.5,  ampTot3 = 1.7, ampTot4 = 1.5;
}

function updateLevel13 () {
  
    xButtonTop1  = 360, xButtonTop2  = 510, xButtonTop3  = 210, xButtonTop4  = 360, xButtonTop5  = 510;
    yButtonTop1  = 190, yButtonTop2  = 190, yButtonTop3  = 390, yButtonTop4  = 390, yButtonTop5  = 390;

    xButtonDown1 = 415, xButtonDown2 = 565, xButtonDown3 = 265, xButtonDown4 = 415, xButtonDown5 = 565;
    yButtonDown1 = 170, yButtonDown2 = 170, yButtonDown3 = 370, yButtonDown4 = 370, yButtonDown5 = 370;

    
    xTank= -25, yTank= 90; 
    
    xButtonMorePower = 80, xButtonLessPower = 80;
    yButtonMorePower = 100, yButtonLessPower = 150;
    
    cantPower1 = 20, cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 5,  cantPoster4 = 5,  cantPoster5 = 5;
    resTot1 = 35, resTot2 = 40, resTot3 = 100, resAct1 = cantPoster1+cantPoster1, resAct2 = cantPoster1+cantPoster1+cantPoster1;
    resAct3=  250; 
    ampTot = 1.7, ampTot2 = 1.5;
    
}

function updateLevel12 () {
  
    xButtonTop1  = 90, xButtonTop2  = 500, xButtonTop3  = 500, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 190, yButtonTop2  = 190, yButtonTop3  = 390, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 145, xButtonDown2 = 555, xButtonDown3 = 555, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 170, yButtonDown2 = 170, yButtonDown3 = 370, yButtonDown4 = 0, yButtonDown5 = 0;

    xTank= -25, yTank= 90; 
    
    xButtonMorePower = 80, xButtonLessPower = 80;
    yButtonMorePower = 100, yButtonLessPower = 150;
    
    cantPower1 = 20, cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 5;
    resTot1 = 15, resTot2 = 20, resTot3 = 15, resAct1 = cantPoster1, resAct2 = cantPoster2, resAct3=  cantPoster3;
    ampTot = 0.7, ampTot2 = 0.7, ampTot3 = 1.5;   
}

function updateLevel11 () {
 
    xButtonTop1  = 500, xButtonTop2  = 380, xButtonTop3  = 520, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 190, yButtonTop2  = 390, yButtonTop3  = 390, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 555, xButtonDown2 = 435, xButtonDown3 = 575, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 170, yButtonDown2 = 370, yButtonDown3 = 370, yButtonDown4 = 0, yButtonDown5 = 0;

    xTank= -25, yTank= 90; 

    cantPower1 = 20, cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 5;
    resTot1 = 20, resTot2 = 15, resTot3 = 5, resAct1 = 5, resAct2 = 5, resAct3 = 5;
    ampTot = 1.0, ampTot2 = 1.0;
}

function updateLevel10 () {
    
    xButtonTop1  = 500, xButtonTop2  = 500, xButtonTop3  = 0, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 390, yButtonTop2  = 390, yButtonTop3  = 0, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 555, xButtonDown2 = 555, xButtonDown3 = 0, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 370, yButtonDown2 = 370, yButtonDown3 = 0, yButtonDown4 = 0, yButtonDown5 = 0;

    xButtonMorePower = 80, xButtonLessPower = 80;
    yButtonMorePower = 100, yButtonLessPower = 150;

    xTank= -25, yTank= 90; 

    cantPower1 = 20, cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 5;
    resTot1 = 5, resTot2 = 15, resTot3 = 5, resAct1 = 5, resAct2 = 5, resAct3 = 5;
    ampTot = 5.1, ampTot2 = 1.7, ampTot3 = 6.9;

}

function updateLevel9 () {
  
    xButtonTop1  = 500, xButtonTop2  = 500, xButtonTop3  = 0, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 190, yButtonTop2  = 390, yButtonTop3  = 0, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 555, xButtonDown2 = 555, xButtonDown3 = 0, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 170, yButtonDown2 = 370, yButtonDown3 = 0, yButtonDown4 = 0, yButtonDown5 = 0;

    cantPoster1 = 5, cantPoster2 = 5; cantPoster3 = 5;
    resTot1 = 20, resTot2 = 15, resTot3 = 5, resAct1 = cantPoster1, resAct2 = cantPoster2, resAct3= cantPoster3;  
    ampTot = 0.6, ampTot2 = 0.8, ampTot3 = 1.5;
}


function updateLevel8 () {
    
    xButtonTop1  = 90, xButtonTop2  = 500, xButtonTop3  = 0, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 190, yButtonTop2  = 190, yButtonTop3  = 0, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 145, xButtonDown2 = 555, xButtonDown3 = 0, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 170, yButtonDown2 = 170, yButtonDown3 = 0, yButtonDown4 = 0, yButtonDown5 = 0;
    
    xTank= -25, yTank= 90; 
    
    cantPower1 = 20, cantPoster1 = 5, cantPoster2 = 5;
    resTot1 = 15, resTot2 = 5, resTot3 = 15, resAct1 = cantPoster1, resAct2 = 5, resAct3=  cantPoster1;
    
    ampTot = 0.3, ampTot2 = 0.8, ampTot3 = 1.1;
    

}

function updateLevel7 () {
    
    xButtonTop1  = 90, xButtonTop2   = 370, xButtonTop3  = 520, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 280, yButtonTop2  = 280, yButtonTop3  = 280, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 145, xButtonDown2 = 425, xButtonDown3 = 575, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 260, yButtonDown2 = 260, yButtonDown3 = 260, yButtonDown4 = 0, yButtonDown5 = 0;

    cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 5, cantPower1 = 20;
    resTot1 = 15, resTot2 = 50, resAct1 = 5, resAct2 = 15;
}

function updateLevel6 () {
    
    xButtonTop1  = 180, xButtonTop2  = 500, xButtonTop3  = 540, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 280, yButtonTop2  = 280, yButtonTop3  = 280, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 235, xButtonDown2 = 555, xButtonDown3 = 595, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 260, yButtonDown2 = 260, yButtonDown3 = 260, yButtonDown4 = 0, yButtonDown5 = 0;

    xButtonMorePower = 80, xButtonLessPower = 80;
    yButtonMorePower = 190, yButtonLessPower = 240;
    
    cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 500, cantPower1 = 20;
    resTot1 = 15, resTot2 = 35, resAct1 = cantPoster1, resAct2 = cantPoster2;
    changeTank = false; limitTank = 1;
}

function updateLevel5 () {
    
    xButtonTop1  = 300, xButtonTop2  = 360, xButtonTop3  = 540, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 280, yButtonTop2  = 280, yButtonTop3  = 280, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 355, xButtonDown2 = 415, xButtonDown3 = 595, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 260, yButtonDown2 = 260, yButtonDown3 = 260, yButtonDown4 = 0, yButtonDown5 = 0;

    xButtonMorePower = 80, xButtonLessPower = 80;
    yButtonMorePower = 190, yButtonLessPower = 240;

    cantPower1 = 20, cantPoster1 = 5; limitTank = 1;
    resTot1    = 15, resAct1 = cantPoster1;
    changeTank = false;
}

function updateLevel4 () {
    
    
    xButtonTop1  = 100, xButtonTop2  = 360, xButtonTop3  = 540, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 280, yButtonTop2  = 280, yButtonTop3  = 280, yButtonTop4  = 0, yButtonTop5  = 0;

    xButtonDown1 = 155, xButtonDown2 = 415, xButtonDown3 = 595, xButtonDown4 = 0, xButtonDown5 = 0;
    yButtonDown1 = 260, yButtonDown2 = 260, yButtonDown3 = 260, yButtonDown4 = 0, yButtonDown5 = 0;

    xButtonMorePower = 80, xButtonLessPower = 80;
    yButtonMorePower = 190, yButtonLessPower = 240;

    cantPower1 = 20; limitTank = 1;
    resTot1 = 5, resAct1 = 5;
}

function updateLevel3 () {
    
    //Coordenadas de los botones de cerrar tuberia
    xButtonTop1  = 100, xButtonTop2  = 380, xButtonTop3  = 525, xButtonTop4  = 0, xButtonTop5  = 0;
    yButtonTop1  = 280, yButtonTop2  = 280, yButtonTop3  = 280, yButtonTop4  = 0, yButtonTop5  = 0;

    //Coordenadas de los botones de abrir tuberia (flecha)
    xButtonDown1 = 155, xButtonDown2 = 435, xButtonDown3 = 580, xButtonDown4 = 0, xButtonDown5winner = 0;
    yButtonDown1 = 260, yButtonDown2 = 260, yButtonDown3 = 260, yButtonDown4 = 0, yButtonDown5 = 0;

    cantPoster1 = 5, cantPoster2 = 5, cantPoster3 = 5;
    resTot1 = 15, resTot2 = 45, resAct1 = 350, resAct2 = 100;
}

function updateLevel2 () {
    
   xButtonTop1  = 180, xButtonTop2  = 450, xButtonTop3  = 0, xButtonTop4  = 0, xButtonTop5  = 0;
   yButtonTop1  = 280, yButtonTop2  = 280, yButtonTop3  = 0, yButtonTop4  = 0, yButtonTop5  = 0;

//Coordenadas de los botones de abrir tuberia (flecha)
   xButtonDown1 = 235, xButtonDown2 = 505, xButtonDown3 = 0, xButtonDown4 = 0, xButtonDown5 = 0;
   yButtonDown1 = 260, yButtonDown2 = 260, yButtonDown3 = 0, yButtonDown4 = 0, yButtonDown5 = 0;
    
   cantPoster1 = 5, cantPoster2 = 5;
   resTot1 = 35, resAct1 = 100; 
}


function victoryLevel1 ()
{            
    this.state.start('main15');
}

siguienteNivel = 2;
game.state.add('main' , mainState);
game.state.add('main2', mainState2);
game.state.add('main3', mainState3);
game.state.add('main4', mainState4);
game.state.add('main5', mainState5);
game.state.add('main6', mainState6);
game.state.add('main7', mainState7);
game.state.add('main8', mainState8);
game.state.add('main9', mainState9);
game.state.add('main10', mainState10);
game.state.add('main11', mainState11);
game.state.add('main12', mainState12);
game.state.add('main13', mainState13);
game.state.add('main14', mainState14);
game.state.add('main15', mainState15);
game.state.start('main');
