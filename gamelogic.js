	//canvas variables
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //GLOBAL: canvas resize function & variables
    function resize_canvas()
    {
        canvas = document.getElementById("canvas");
        if (canvas.width < window.innerWidth)
        {
            canvas.width = window.innerWidth;
        }
        if (canvas.height < window.innerHeight)
        {
            canvas.height = window.innerHeight;
        }
    }
    var ylimit = canvas.height;
    var xlimit = canvas.width;
    var xylimit = ylimit * xlimit;
    var scale = 30;

    //function initialisations
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2World = Box2D.Dynamics.b2World,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2RayCastInput = Box2D.Collision.b2RayCastInput,
        b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
        b2AABB = Box2D.Collision.b2AABB;

    //world variable
    var world = new b2World(new b2Vec2(0, 10), true);

    //ray variables
    var rayLength = xlimit; //long enough to hit the walls
    var currentRayAngle = 0;
    var input = new b2RayCastInput();
    var output = new b2RayCastOutput();
    var b = new b2BodyDef();
    var f = new b2FixtureDef();
    var closestFraction = 1;
    var intersectionPoint = new b2Vec2();
    var p2 = new b2Vec2();
    var normalEnd = new b2Vec2();
    var scope = 0;
    var DEGTORAD = Math.PI / 180;
    var count = 0;
    var circle = 0;
    var x;
    var y;
	
	//menu navigation variables
	var escape=false;
	var instruc=false;
	var goback=false;
	var startvar=true;
	var end=false;
	var died=false;
	var countdowndone=false;
	//var contact=false;
	var restart=false;
	var levelnumber=0;
	var score=0;
	var highscore;
	var time;
	var lives=3;
	var a=0;
	
	//music
	var blueshoot = new Audio("blueportalshoot.mp3"); //blue portal shooting sound
	var redshoot = new Audio("redportalshoot.mp3"); //red portal shooting sound
	var level = new Audio("Level.mp3")//level gameplay music
	level.volume=0.5;
	var warp = new Audio("warp.mp3")//portal warping music
	var bouncesound = new Audio("bouncesound.mp3")//blue box bounce music
	var menu = new Audio("menu.mp3")//level gameplay music
	
	//music functions
	
	function menusound()
	{
		menu.play();
	}
	
	function playlevel(num)
		{
			if(num==1)
			{
				if (typeof level.loop == 'boolean')
				{
					level.loop = true;
				}
				else
				{
					level.addEventListener('ended', function() {
						this.currentTime = 0;
						this.play();
					}, false);
				}
			}
			/*else
			{
				level.loop = false;
				level.pause();
			}*/
				
		}
	
	var tempbody = new b2BodyDef();
	tempbody.type = b2Body.b2_staticBody;
    tempbody.position.Set(0,0);
    tempbody.userData = 'null';
	var tempfix = new b2FixtureDef();
	tempfix.density = 10;
    tempfix.friction = 0.5;
    tempfix.restitution = 0.6;
    tempfix.shape = new b2CircleShape(0.001 * (xlimit + ylimit) / (1200 + 900));
	var temp = world.CreateBody(tempbody);
    temp.CreateFixture(tempfix);
	
	var tempbody = new b2BodyDef();
	tempbody.type = b2Body.b2_staticBody;
    tempbody.position.Set(0,0);
    tempbody.userData = 'null';
	var tempfix = new b2FixtureDef();
	tempfix.density = 10;
    tempfix.friction = 0.5;
    tempfix.restitution = 0.6;
    tempfix.shape = new b2CircleShape(0.001 * (xlimit + ylimit) / (1200 + 900));
	var temp2 = world.CreateBody(tempbody);
    temp2.CreateFixture(tempfix);
	
	var tempbody = new b2BodyDef();
	tempbody.type = b2Body.b2_staticBody;
    tempbody.position.Set(0,0);
    tempbody.userData = 'null';
	var tempfix = new b2FixtureDef();
	tempfix.density = 10;
    tempfix.friction = 0.5;
    tempfix.restitution = 0.6;
    tempfix.shape = new b2CircleShape(0.001 * (xlimit + ylimit) / (1200 + 900));
	var portalbody = world.CreateBody(tempbody);
    portalbody.CreateFixture(tempfix);

    //portal variable
    var bcreate = 0;
	var rcreate = 0;
	var current=0;
	var shouldmove=0;
	var live=0;
	var bset=0;
	var rset=0;
	var newpo=new b2Vec2();
	var vel=new b2Vec2();
	var ang;
	var magx;
	var magy;
	var mag;
	var relang;
	
	//bounce variable
	var shouldbounce=0;
	var vspeed=new b2Vec2();
	
	
    //conveyor and attach variables
    var zero = new b2Vec2(0, 0);
	var userdata;
	var userdata2;

    //Player: Circle
    //body definition
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set(4 * xlimit / 1200, 25 * ylimit / 900);
    bodyDef.userData = 'obj';

    //fixture definition
    var fixDef = new b2FixtureDef;
    fixDef.density = 10;
    fixDef.friction = 1;
    fixDef.restitution = 0.6;
    fixDef.shape = new b2CircleShape(1 * (xlimit + ylimit) / (1200 + 900));

    //wheel creation
    var wheel = world.CreateBody(bodyDef);
    wheel.CreateFixture(fixDef);

    //Assigning wheel's position as the beginning point of ray casting
    var p1 = wheel.GetPosition(); //centre of scene

    //anti-gravity variable
    var attract = new b2Vec2(0, -10 * wheel.GetMass());

    //force variable
    var f1 = new b2Vec2(6 * wheel.GetMass(), 0);
    var f2 = new b2Vec2(0, -12 * wheel.GetMass());
    var f3 = new b2Vec2(-12 * wheel.GetMass(), 0);
	
	var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(-1 * xlimit / 1200, (ylimit / scale) - (10 * ylimit / 900));
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(1 * xlimit / 1200, 20 * ylimit / 900);
        var border1 = world.CreateBody(bodyDef);
        border1.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(20 * xlimit / 1200, (ylimit / scale) - (31 * ylimit / 900));
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(20 * xlimit / 1200, 1* ylimit / 900);
        var border2 = world.CreateBody(bodyDef);
        border2.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(41 * xlimit / 1200, (ylimit / scale) - (10 * ylimit / 900));
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(1 * xlimit / 1200, 20 * ylimit / 900);
        var border3 = world.CreateBody(bodyDef);
        border3.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(20 * xlimit / 1200, (ylimit / scale) + (9 * ylimit / 900));
		bodyDef.userData='death';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(20 * xlimit / 1200, 1 * ylimit / 900);
        var border4 = world.CreateBody(bodyDef);
        border4.CreateFixture(fd);
	
	function createCountDown(timeRemaining) 
	{
		var startTime = Date.now();
		return function() 
		{
			if(timeRemaining - ( Date.now() - startTime )<0)
				return 0;
			else
			return timeRemaining - ( Date.now() - startTime );
		}
	}
	
	function instructions()
	{
		document.getElementById('pause').style.display='none';
		document.getElementById('startmenu').style.display='none';
		document.getElementById('instructions').style.display='block';
		instruc=true;
	}
	
	function backtogame()
	{
		escape=false;
	}
	
	window.back =function ()
	{
		
		instruc=false;
		document.getElementById('instructions').style.display='none';
		document.getElementById('showcredits').style.display='none';
		if(startvar==true)
		{
			document.getElementById('startmenu').style.display='block';
		}
		
	}
	
	window.start =function ()
	{
		document.getElementById('startmenu').style.display='none';
		document.getElementById('score').style.display='block';
		document.getElementById('lives').style.display='block';
		document.getElementById('time').style.display='block';
		document.getElementById('canvas').style.display='block';
		startvar=false;
		level4();
	}
	
	window.credits =function ()
	{
		document.getElementById('pause').style.display='none';
		document.getElementById('startmenu').style.display='none';
		document.getElementById('showcredits').style.display='block';
	}
	
    //fps display
    var fps = {
        startTime: 0,
        frameNumber: 0,
        getFPS: function()
        {
            this.frameNumber++;
            var d = new Date().getTime(),
                currentTime = (d - this.startTime) / 1000,
                result = Math.floor((this.frameNumber / currentTime));

            if (currentTime > 1)
            {
                this.startTime = new Date().getTime();
                this.frameNumber = 0;
            }
            return result;
        }
    };
    var fpsa = document.getElementById('fps');

    //GLOBAL: portals function to exchange position
    function portals(tempbody,tempbody2)
    {
		if(current==0 && live==1)
		{
		warp.play();
		relang=tempbody2.GetAngle()-tempbody.GetAngle()+Math.PI;
		magx=wheel.GetLinearVelocity().x;
		magy=wheel.GetLinearVelocity().y;
		vel.x=(magx*Math.cos(relang)+magy*Math.sin(relang));
		vel.y=-magx*Math.sin(relang)+magy*Math.cos(relang);
		newpo.x=tempbody.GetPosition().x;
		newpo.y=tempbody.GetPosition().y;
		shouldmove=1;
		current=1;
		}
    }
	
	function active()
	{
		if(bset==1 && rset==1)
			live=1;
		else
			live=0;
	}
	
	function mousedown(event) 
	{
		switch (event.which) 
		{
			case 1:if(scope==1)
					{		
					if(bcreate==0)bcreate=1;
					if(escape==false)blueshoot.play();
					}
					break;
			case 2:break;
			case 3:if(scope==1)
					{		
					if(escape==false)redshoot.play();
					if(rcreate==0)rcreate=1;
					}
					break;
			default:break;
		}
	}
	
	function mouseup(event) 
	{
		switch (event.which) 
		{
			case 1:if(scope==1)
					{		
					if(bcreate==1)bcreate=0;
					}
					break;
			case 2:break;
			case 3:if(scope==1)
					{		
					if(rcreate==1)rcreate=0;
					}
					break;
			default:break;
		}
	}

    function getPos(e)
    {
        x = e.clientX;
        y = e.clientY;
    }

    function stopTracking()
    {

    }
	
	function draw()
	{
		ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );
		for (b = world.GetBodyList() ; b; b = b.GetNext())
		{
			var angle = b.GetAngle()*(180/Math.PI);
			for(f = b.GetFixtureList(); f; f = f.GetNext()) {
	 
			 if (b.GetUserData() == 'obj')
			 {
				 var radius = f.GetShape().GetRadius();
				 var pos = b.GetPosition();
	 
				 ctx.save();
	 
				 ctx.translate( pos.x * 30, pos.y * 30 );
				 ctx.rotate( angle * (Math.PI/180) );
				 ctx.translate( -pos.x * 30, -pos.y * 30 );
	 
				 ctx.beginPath();
				 ctx.arc(pos.x * 30, pos.y * 30, radius * 30, 0, 2 * Math.PI, false);
				 ctx.closePath();
				 ctx.lineWidth = 1;
				 ctx.strokeStyle = "rgba(23, 48, 255, 1)";
				 ctx.fillStyle = "rgba(23, 48, 255, 0.1)";
				 ctx.stroke();
				 ctx.fill();
	 
				 ctx.restore();
	 
			  }
			  else if (b.GetUserData() == 'conveyor')
			 {
				 var radius = f.GetShape().GetRadius();
				 var pos = b.GetPosition();
	 
				 ctx.save();
	 
				 ctx.translate( pos.x * 30, pos.y * 30 );
				 ctx.rotate( angle * (Math.PI/180) );
				 ctx.translate( -pos.x * 30, -pos.y * 30 );
	 
				 ctx.beginPath();
				 ctx.arc(pos.x * 30, pos.y * 30, radius * 30, 0, 2 * Math.PI, false);
				 ctx.closePath();
				 ctx.lineWidth = 1;
				 ctx.strokeStyle = "rgba(255, 255, 255, 1)";
				 ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
				 //ctx.stroke();
				 ctx.fill();
	 
				 ctx.restore();
	 
			  }
	 
			  else if (b.GetUserData() == 'ground')
			  { 
				  var X = f.GetShape().GetVertices()[1].x - f.GetShape().GetVertices()[0].x; 
				  var Y = f.GetShape().GetVertices()[2].y - f.GetShape().GetVertices()[1].y;    
				  var pos = b.GetPosition();
	 
				  ctx.save();
	 
				  ctx.translate( pos.x * 30, pos.y * 30 );
				  ctx.rotate( angle * (Math.PI/180) );
				  ctx.translate( -pos.x * 30, -pos.y * 30 );
	 
				  ctx.lineWidth = 3;
				  //ctx.strokeStyle = "rgba(0, 98, 255, 1)";
				  //ctx.strokeRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
				  ctx.fillStyle = "rgba(0, 125, 255, 0.8)";
				  ctx.fillStyle = "rgba(0, 20, 29, 1)";
				  ctx.fillRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
	 
				  ctx.restore();
	 
			   }
				else if (b.GetUserData() == 'carrier')
			  { 
				  var X = f.GetShape().GetVertices()[1].x - f.GetShape().GetVertices()[0].x; 
				  var Y = f.GetShape().GetVertices()[2].y - f.GetShape().GetVertices()[1].y;    
				  var pos = b.GetPosition();
	 
				  ctx.save();
	 
				  ctx.translate( pos.x * 30, pos.y * 30 );
				  ctx.rotate( angle * (Math.PI/180) );
				  ctx.translate( -pos.x * 30, -pos.y * 30 );
	 
				  ctx.lineWidth = 3;
				  ctx.strokeStyle = "rgba(25, 29, 39, 1)";
				  //ctx.strokeRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
				  ctx.fillStyle = "rgba(0, 0, 20, 1)";
				  ctx.fillRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
	 
				  ctx.restore();
	 
			   } 
				else if (b.GetUserData() == 'cbox')
			  { 
				  var X = f.GetShape().GetVertices()[1].x - f.GetShape().GetVertices()[0].x; 
				  var Y = f.GetShape().GetVertices()[2].y - f.GetShape().GetVertices()[1].y;    
				  var pos = b.GetPosition();
	 
				  ctx.save();
	 
				  ctx.translate( pos.x * 30, pos.y * 30 );
				  ctx.rotate( angle * (Math.PI/180) );
				  ctx.translate( -pos.x * 30, -pos.y * 30 );
	 
				  ctx.lineWidth = 3;
				  ctx.strokeStyle = "rgba(200, 77, 82, 1)";
				  //ctx.strokeRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
				  ctx.fillStyle = "rgba(0, 20, 29, 1)";
				  ctx.fillRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
	 
				  ctx.restore();
	 
			   }
			   else if (b.GetUserData() == 'portal')
			  { 
				  var X = f.GetShape().GetVertices()[1].x - f.GetShape().GetVertices()[0].x; 
				  var Y = f.GetShape().GetVertices()[2].y - f.GetShape().GetVertices()[1].y;    
				  var pos = b.GetPosition();
	 
				  ctx.save();
	 
				  ctx.translate( pos.x * 30, pos.y * 30 );
				  ctx.rotate( angle * (Math.PI/180) );
				  ctx.translate( -pos.x * 30, -pos.y * 30 );
					
				  if(b==temp)
				  {
					  ctx.strokeStyle = "rgba(0, 0, 255, 1)";
				      ctx.fillStyle = "rgba(0, 0, 255, 0.8)";
				  }
				  else if(b==temp2)
				  {
					  ctx.strokeStyle = "rgba(255, 0, 0, 1))";
				      ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
				  }
				  else
				  {
					  ctx.strokeStyle = "rgba(255, 255, 255, 1)";
					  ctx.fillStyle = "rgba(255, 255, 255, 1)";
				  }
				  ctx.lineWidth = 1;
				  
				  ctx.fillRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
	 
				  ctx.restore();
	 
			   }
			   else if (b.GetUserData() == 'bounce')
			  { 
				  var X = f.GetShape().GetVertices()[1].x - f.GetShape().GetVertices()[0].x; 
				  var Y = f.GetShape().GetVertices()[2].y - f.GetShape().GetVertices()[1].y;    
				  var pos = b.GetPosition();
	 
				  ctx.save();
	 
				  ctx.translate( pos.x * 30, pos.y * 30 );
				  ctx.rotate( angle * (Math.PI/180) );
				  ctx.translate( -pos.x * 30, -pos.y * 30 );
	 
				  ctx.lineWidth = 3;
				  ctx.strokeStyle = "rgba(0, 68, 236, 0.1)";
				  ctx.strokeRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
				  ctx.fillStyle = "rgba(0, 68, 236, 1)";
				  ctx.fillRect(((pos.x * 30) - (X * 30 / 2)), ((pos.y * 30) - (Y * 30 / 2)), X * 30, Y * 30);
	 
				  ctx.restore();
	 
			   }
			   
			}
		}
	}

	var pull = [];
	var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = function(contact) // will be fired when contact begins
        {
            fxA = contact.GetFixtureA(); // 1st FIXTURE which COLLIDES
            fxB = contact.GetFixtureB(); // 2nd FIXTURE which COLLIDES
			fbA = fxA.GetBody();
			fbB = fxB.GetBody();
			AUD=fbA.GetUserData();
			BUD=fbB.GetUserData();
            sA = fxA.IsSensor(); // Will store whether 1st fixture is a sensor or not (true or false)
            sB = fxB.IsSensor(); // Will store whether 2nd fixture is a sensor or not (true or false)
            if ((sA && !sB) || (sB && !sA)) // Will go on further iff Fixture A or B not both are sensors.
            {
                if (sA) // If Fixture A is a Sensor
                {
					CUD=temp2.GetUserData();
					DUD=temp.GetUserData();
					if(AUD=='portal' && CUD=='portal' && BUD=='obj' && fbA==temp && rset==1 && bset==1)
					{
                    portals(temp2,temp);
					}
					else if(AUD=='portal' && DUD=='portal' && BUD=='obj' && fbA==temp2 && rset==1 && bset==1)
					{
                    portals(temp,temp2);
					}
					if(AUD=='bounce' && BUD=='obj')
					{
					bouncesound.play();
					shouldbounce=1;
					vspeed.x=wheel.GetLinearVelocity().x*2;
					vspeed.y=wheel.GetLinearVelocity().y*2;
					}
					if(AUD=='conveyor' && BUD=='obj')
					{
					pull.push(fbA);
					}
                }
                else // If Fixture B is a Sensor
                {
					CUD=temp2.GetUserData();
					DUD=temp.GetUserData();
                    if(BUD=='portal' && CUD=='portal' && AUD=='obj' && fbB==temp && rset==1 && bset==1)
					{
					portals(temp2,temp);
					}
					else if(BUD=='portal' && DUD=='portal' && AUD=='obj' && fbB==temp2 && rset==1 && bset==1)
					{
					portals(temp,temp2);
					}
					if(BUD=='bounce' && AUD=='obj')
					{
					bouncesound.play();
					shouldbounce=1;
					vx=wheel.GetLinearVelocity().x*2;
					vy=wheel.GetLinearVelocity().y*2;
					}
					if(BUD=='conveyor' && AUD=='obj')
					{
					pull.push(fbB);
					}
                }
            }
			if(!sA && !sB)
			{
				if((AUD=='obj' && BUD=='death') || (AUD=='death' && BUD=='obj'))
				{
					lives--;
					died=true;
					wheel.SetLinearVelocity(zero);
					wheel.SetAngularVelocity(0);
				}
			}
			if(!sA && !sB)
			{
				if((AUD=='ground' && BUD=='obj') || (AUD=='carrier' && BUD=='obj'))
				{
					console.log("dfh");
					listener.BeginContact.localcontact=window.localcontact=true;
					console.log(contact);
				}
				else if((AUD=='obj' && BUD=='ground') || (AUD=='obj' && BUD=='carrier'))
				{
					console.log("dfh");
					listener.BeginContact.localcontact=window.localcontact=true;
				}
			}
        }
	listener.EndContact = function(contact) 
	{
         	 fxA=contact.GetFixtureA();
			 fxB=contact.GetFixtureB();
			 fbA = fxA.GetBody();
			 fbB = fxB.GetBody();
			 AUD=fbA.GetUserData();
			 BUD=fbB.GetUserData();
			 sA=fxA.IsSensor();
			 sB=fxB.IsSensor();
			 if((sA && !sB) || (sB && !sA))	{
				 if(sA)	
				 {
					CUD=temp2.GetUserData();
					DUD=temp.GetUserData();
					if(AUD=='portal' && CUD=='portal' && BUD=='obj' && fbA==temp && rset==1 && bset==1)
					{
						current=0;
					}
					else if(AUD=='portal' && DUD=='portal' && BUD=='obj' && fbA==temp2 && rset==1 && bset==1)
					{
						current=0;
					}
					if(AUD=='conveyor' && BUD=='obj')
					{
					var index = pull.indexOf(fbA); 
					pull.splice(index,1);
					}
					
				 }
				 else	
				 {
					CUD=temp2.GetUserData();
					DUD=temp.GetUserData();
					if(BUD=='portal' && CUD=='portal' && AUD=='obj' && fbB==temp && rset==1 && bset==1)
					{
						current=0;
					}
					else if(BUD=='portal' && DUD=='portal' && AUD=='obj' && fbB==temp2 && rset==1 && bset==1)
					{
						current=0;
					}
					if(BUD=='conveyor' && AUD=='obj')
					{
					var index = pull.indexOf(fbB); 
					pull.splice(index,1);
					}
				 }
			 }
			 if(!sA && !sB)
			{
				if((AUD=='ground' && BUD=='obj') || (AUD=='carrier' && BUD=='obj')|| (AUD=='bounce' && BUD=='obj'))
				{
					console.log("nooo");
					listener.EndContact.localcontact=window.localcontact=false;
				}
				else if((AUD=='obj' && BUD=='ground') || (AUD=='obj' && BUD=='carrier')|| (AUD=='obj' && BUD=='bounce'))
				{
					console.log("nooo");
					listener.EndContact.localcontact=window.localcontact=false;
				}
			}
	}
	
    function ray()
    {
        var k = 360 / 5;
        var t = k / 60;
        p2.x = x / scale;
        p2.y = y / scale;
        input.p1 = p1;
        input.p2 = p2;
        input.maxFraction = 1;
        closestFraction = 1;
		var intersectionNormal = new b2Vec2(0, 0);
        var b = new b2BodyDef();
        var f = new b2FixtureDef();
        for (b = world.GetBodyList(); b; b = b.GetNext())
        {
            for (f = b.GetFixtureList(); f; f = f.GetNext())
            {
				userdata = b.GetUserData();
                if (!f.RayCast(output, input))
                    continue;
                else if (output.fraction < closestFraction && userdata!='conveyor')
                {
                    closestFraction = output.fraction;
                    intersectionNormal = output.normal;
					portalbody=b;
                }
            }
        }
		userdata2=portalbody.GetUserData();
		if(bcreate==1 && userdata2=='portal' && temp2!=portalbody)
		{
			temp=portalbody;
			bset=1;
			console.log("Blueportal");
		}
		if(rcreate==1 && userdata2=='portal' && temp!=portalbody)
		{
			temp2=portalbody;
			rset=1;
		}
        intersectionPoint.x = p1.x + closestFraction * (p2.x - p1.x);
        intersectionPoint.y = p1.y + closestFraction * (p2.y - p1.y);
        normalEnd.x = intersectionPoint.x + intersectionNormal.x;
        normalEnd.y = intersectionPoint.y + intersectionNormal.y;
		ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(p1.x * scale, p1.y * scale);
        ctx.lineTo(intersectionPoint.x * scale, intersectionPoint.y * scale);
        ctx.closePath();
        ctx.stroke();
		ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(p1.x * scale, p1.y * scale);
        ctx.lineTo(intersectionPoint.x * scale, intersectionPoint.y * scale);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    function downkeyhandler(event)
    {
        var keycode = event.which;
        switch (keycode)
        {
            case 32:if (count == 0) count = 1;
					else if (count == 1) count = 0;
					break;
            case 80:
                if (scope == 0)
                    scope = 1;
                else if (scope == 1)
                    scope = 0;
                break;
            default:
                break;
        }
    }

    function upkeyhandler(event)
    {
        var keycode = event.which;
		var key=event.keyCode;
        switch (keycode)
        {
			case 37:if(localcontact==true)
					{
						var mass = wheel.GetMass() * 10;
						wheel.ApplyImpulse(new b2Vec2(-0.2*mass, 0), wheel.GetPosition());
					}
                break;
            case 38:if(localcontact==true)
					{
						var mass = wheel.GetMass() * 10;
						wheel.ApplyImpulse(new b2Vec2(0, -0.5*mass), wheel.GetPosition());
					}
                break;
            case 39:if(localcontact==true)
					{
						var mass = wheel.GetMass() * 10;
						wheel.ApplyImpulse(new b2Vec2(0.2*mass, 0), wheel.GetPosition());
					}
                break;
            default:break;
        }
		switch (key)
        {
            case 27:if(instruc==false)
					{
						if(escape==false)escape=true;
						else if(escape==true)escape=false;
					}
					break;
            default:break;
        }
    }
	var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
        debugDraw.SetDrawScale(30);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
