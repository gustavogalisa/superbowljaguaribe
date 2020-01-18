var game;
 
// the ball you are about to fire
var ball;
 
// the rectangle where you can place the ball and charge the launch power
var launchRectangle = new Phaser.Rectangle(250, 250, 200, 150);
 
// here we will draw the predictive trajectory
var trajectoryGraphics;
 
// a simply multiplier to increase launch power
var forceMult = 5;
 
// here we will store the launch velocity
var launchVelocity;
 
// function to be executed when the window loads
function startGame() {    
     // starting the game itself
    game = new Phaser.Game(800, 600, Phaser.AUTO, "");
     // creation and execution of "PlayGame" state
     game.state.add("PlayGame",playGame);
     game.state.start("PlayGame");
}
 
var playGame = function(game){};
 
playGame.prototype = {
     // preloading graphic assets (only the ball)
    preload: function(){
          game.load.image("ball", "/imagens/colored_football_icon.png");
    },
     // function to be executed onche game has been created
    create: function(){
          // adding a new graphics and drawing the launch rectangle in it
          var launchGraphics = game.add.graphics(0, 0);
          launchGraphics.lineStyle(5, 0xff0000);
          launchGraphics.drawRect(launchRectangle.x, launchRectangle.y, launchRectangle.width, launchRectangle.height);          
          // also adding the graphics where we'll draw the trajectory
          trajectoryGraphics = game.add.graphics(0, 0);          
          // setting initial launch velocity to zero
          launchVelocity = new Phaser.Point(0, 0);
          // changing game background to dark grey
        game.stage.backgroundColor = "#222222";
          // initializing Box2D physics
        game.physics.startSystem(Phaser.Physics.BOX2D);
          // setting gravity
          game.physics.box2d.gravity.y = 500;
        // waiting for player input then call placeBall function
          game.input.onDown.add(placeBall);
    }
}
 
// this function will place the ball
function placeBall(e){
     // we place a new ball only if we are inside launch rectangle
     if(launchRectangle.contains(e.x, e.y)){
          // adding ball sprite
          ball = game.add.sprite(e.x, e.y, "ball");
          // enabling physics to ball sprite
          game.physics.box2d.enable(ball);
          // temporarily set ball gravity to zero, so it won't fall down
          ball.body.gravityScale = 0;
          // telling Box2D we are dealing with a circle shape
          ball.body.setCircle(ball.width / 2);
          // removing onDown listener
          game.input.onDown.remove(placeBall);
          // when the player ends the input call launchBall function
          game.input.onUp.add(launchBall);
          // when the player moves the input call chargeBall
          game.input.addMoveCallback(chargeBall);
     }  
}
 
// this function will allow the player to charge the ball before the launch, and it's the core of the example
function chargeBall(pointer, x, y, down){
     // we does not allow multitouch, so we are only handling pointer which id is zero
     if(pointer.id == 0){
          // clearing trajectory graphics, setting its line style and move the pen on ball position
          trajectoryGraphics.clear();
          trajectoryGraphics.lineStyle(3, 0x00ff00);
          trajectoryGraphics.moveTo(ball.x, ball.y);
          // now we have two options: the pointer is inside the launch rectangle...
          if(launchRectangle.contains(x, y)){
               // ... and in this case we simply draw a line to pointer position
               trajectoryGraphics.lineTo(x, y);
               launchVelocity.x = ball.x - x;
               launchVelocity.y = ball.y - y;               
          }
          // ... but the pointer cal also be OUTSIDE launch rectangle
          else{
               // ... in this case we have to check for the intersection between launch line and launch rectangle
               var intersection = lineIntersectsRectangle(new Phaser.Line(x, y, ball.x, ball.y), launchRectangle);
               trajectoryGraphics.lineTo(intersection.x, intersection.y);
               launchVelocity.x = ball.x - intersection.x;
               launchVelocity.y = ball.y - intersection.y;
          } 
          // now it's time to draw the predictive trajectory  
          trajectoryGraphics.lineStyle(1, 0x00ff00);  
          launchVelocity.multiply(forceMult, forceMult);
          for (var i = 0; i < 180; i += 6){
               var trajectoryPoint = getTrajectoryPoint(ball.x, ball.y, launchVelocity.x, launchVelocity.y, i);
               trajectoryGraphics.moveTo(trajectoryPoint.x - 3, trajectoryPoint.y - 3); 
               trajectoryGraphics.lineTo(trajectoryPoint.x + 3, trajectoryPoint.y + 3);
               trajectoryGraphics.moveTo(trajectoryPoint.x - 3, trajectoryPoint.y + 3);  
               trajectoryGraphics.lineTo(trajectoryPoint.x + 3, trajectoryPoint.y - 3);        
          }     
     }
}
 
// function to launch the ball
function launchBall(){
     // adjusting callbacks
     game.input.deleteMoveCallback(0);
     game.input.onUp.remove(launchBall);
     game.input.onDown.add(placeBall);
     // setting ball velocity
     ball.body.velocity.x = launchVelocity.x;
     ball.body.velocity.y = launchVelocity.y;
     // applying the gravity to the ball
     ball.body.gravityScale = 1;     
}
 
// simple function to check for intersection between a segment and a rectangle
function lineIntersectsRectangle(l, r){
     return l.intersects(new Phaser.Line(r.left, r.top, r.right, r.top), true) ||
          l.intersects(new Phaser.Line(r.left, r.bottom, r.right, r.bottom), true) ||
          l.intersects(new Phaser.Line(r.left, r.top, r.left, r.bottom), true) ||
          l.intersects(new Phaser.Line(r.right, r.top, r.right, r.bottom), true);
}
 
// function to calculate the trajectory point taken from http://phaser.io/examples/v2/box2d/projected-trajectory
function getTrajectoryPoint(startX, startY, velocityX, velocityY, n) {
     var t = 1 / 60;    
     var stepVelocityX = t * game.physics.box2d.pxm(-velocityX); 
     var stepVelocityY = t * game.physics.box2d.pxm(-velocityY);    
     var stepGravityX = t * t * game.physics.box2d.pxm(-game.physics.box2d.gravity.x); 
     var stepGravityY = t * t * game.physics.box2d.pxm(-game.physics.box2d.gravity.y);
     startX = game.physics.box2d.pxm(-startX);
     startY = game.physics.box2d.pxm(-startY);    
     var tpx = startX + n * stepVelocityX + 0.5 * (n * n + n) * stepGravityX;
     var tpy = startY + n * stepVelocityY + 0.5 * (n * n + n) * stepGravityY;    
     tpx = game.physics.box2d.mpx(-tpx);
     tpy = game.physics.box2d.mpx(-tpy);    
     return {
          x: tpx, 
          y: tpy 
     };
}