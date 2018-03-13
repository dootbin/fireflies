function init() {

  //get a reference to thecanvas element. 
  canvas = document.querySelector( '.fireFlies' );

  //Get the canvas' context object which is what
  //we'll use to draw (paint on the canvas.)

  ctx = canvas.getContext( '2d' );

  // Combine steps 1 and 2

  ctx = document.querySelector( '.fireFlies' ).getContext( '2d' );

  fireFlies = [];
  numFlies = 20;
  angleX = 0;
  angleY = 0;
  range = 1.2;
  xSpeed = .7;
  ySpeed = .1;
  fps = 15;

  // Create a batch of firefly particles (objects)

  // and add each new Firefly object. 

  for ( var i = 0; i < numFlies; i++ ) {

    xVelocity = randRange( -4, 2 );
    yVelocity = randRange( -4, 2 );

    //WE DONT EVER WANT OUR VELOCITY VALUES TO BE NEAR 0; 
    if ( xVelocity < 1 && xVelocity > -1 ) {
      xVelocity = -1; 
    }
    if ( yVelocity < 1 && yVelocity > -1 ) {
      yVelocity = -1; 
    }

    //Create a new FireFly particle object (instance) 
    // And add it to the end of the fireFlies array
    // Later user... 

    fireFlies.push( new fireFly( 10, canvas.height - 10, 10, canvas.width - 10, xVelocity, yVelocity ) );

  } 

  //get the animation started by calling update() using a timmer to kick off the heartbbeat
  // (animation loop. have it run repeatedly framerate times per second until)
  //user leaves the page. 

  requestAnimationFrame(update);

}

function randRange( min, max ) {
  return Math.random() * ( max - min ) + min;
}

//Constructor function for our Firefly "class"

function fireFly( topEdge, bottomEdge, leftEdge, rightEdge, xVel, yVel ) {

  //Save the passed-in parameter values in properties
  // of our new Firefly object for later access because
  // parameter variables are local in scope to this function
  // and cannot be accssed outside of this funciton. 

  this.top = topEdge;
  this.bottom = bottomEdge; 
  this.left = leftEdge;
  this.right = rightEdge;
  this.xVelocity = xVel;
  this.yVelocity = yVel;

  this.x = Math.random() * canvas.width / 2;
  this.y = Math.random() * canvas.height; 

  this.alpha = randRange( .2, .9 );
  this.color = 'rgba(152, 255, 5, ' + this.alpha + ')';
  this.radius = randRange( 2, 4 );
  this.maxBlinkRate = 15;
  this.blinkRate = Math.floor( randRange( 0, this.maxBlinkRate ) );

}

//Draw an animate the firefly particle objects on our canvas. 
function update() {

  // Use a hack using setTimeout() to reset the framerate 
  setTimeout(function() {

    //clear the canvas

    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    //Let's draw the firefly particles that are in our
    // fireFlies array on the canvas
    
    fireFlies.forEach(function(fly, index) {
      
      ctx.beginPath();

      ctx.fillStyle = fly.color;

      //Based on the blinkRate property, reset the blink property 

      if (fly.blinkRate >= fly.maxBlinkRate) {
        fly.blinkRate = 0;
        fly.blink = false; 
      } else {

        fly.blinkRate += 1;
        
        if (fly.blinkRate >= Math.floor(fly.maxBlinkRate / 2)) {

          fly.blink = true;

        }

      }

      if (fly.blink) {
        ctx.arc( fly.x, fly.y, fly.radius, Math.PI * 2, false );
        ctx.fill();
      }

      fly.x += fly.xVelocity + Math.cos(angleX) * range;
      fly.y += fly.yVelocity + Math.sin(angleY) * range;

      // alter the angles for sin and cos
      angleX += xSpeed;
      angleY += ySpeed;

      //Collision detection at our bboundaries to keep
      //our fire flies visibble
      //
      //Check bbottom edge

      if (fly.y >= fly.bottom + 25 && fly.yVelocity > 0 ) {

        fly.y = fly.bottom + 5;
        fly.yVelocity *= -1;

      } else if (fly.y <= fly.top - 25 && fly.yVelocity < 0) {

        fly.y = 5;
        fly.yVelocity *= -1 
      }


      if (fly.x >= fly.right + 25 && fly.xVelocity > 0 ) {

        fly.x = fly.right + 5;
        fly.xVelocity *= -1;

      } else if (fly.x <= fly.left - 25 && fly.xVelocity < 0) {

        fly.x = 5;
        fly.xVelocity *= -1; 
      }

     
 
    });

    requestAnimationFrame(update);

  }, 1000/fps);

}
