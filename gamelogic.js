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
		relang=tempbody2.GetAngle()-tempbody.GetAngle()+Math.PI;
		magx=wheel.GetLinearVelocity().x;
		magy=wheel.GetLinearVelocity().y;
		vel.x=-(magx*Math.cos(relang)+magy*Math.sin(relang));
		vel.y=-magx*Math.sin(relang)+magy*Math.cos(relang);
		newpo.x=tempbody.GetPosition().x;
		newpo.y=tempbody.GetPosition().y;
		shouldmove=1;
		current=1;
		}
    }

	var redportal = 
	{
        draw: function()
        {
            ctx.fillStyle = this.color;
			ctx.fillRect(temp2.GetPosition().x*scale*xlimit/1200,temp2.GetPosition().y*scale*ylimit/900, 2*scale*xlimit/1200,0.3*scale*ylimit/900 );
        }
    };
	
    var blueportal = 
	{
        draw: function()
        {
            ctx.fillStyle = this.color;
			ctx.fillRect(temp.GetPosition().x*scale*xlimit/1200,temp.GetPosition().y*scale*ylimit/900, 2*scale*xlimit/1200,0.3*scale*ylimit/900 );
        }
    };
	
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
					}
					break;
			case 2:break;
			case 3:if(scope==1)
					{		
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
					//alert("here1");
					fxB.SetRestitution(1);
                    portals(temp2,temp);
					}
					else if(AUD=='portal' && DUD=='portal' && BUD=='obj' && fbA==temp2 && rset==1 && bset==1)
					{
					fxB.SetRestitution(1);
					//alert("here2");
                    portals(temp,temp2);
					}
					if(AUD=='bounce' && BUD=='obj')
					{
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
					fxA.SetRestitution(1);
					//alert("here3");
					portals(temp2,temp);
					}
					else if(BUD=='portal' && DUD=='portal' && AUD=='obj' && fbB==temp2 && rset==1 && bset==1)
					{
					fxA.SetRestitution(1);
					//alert("here4");
					portals(temp,temp2);
					}
					if(BUD=='bounce' && AUD=='obj')
					{
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
						fxB.SetRestitution(0.6);
						//alert("Here0001");
						current=0;
					}
					else if(AUD=='portal' && DUD=='portal' && BUD=='obj' && fbA==temp2 && rset==1 && bset==1)
					{
						fxB.SetRestitution(0.6);
						//alert("Here0002");
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
						fxA.SetRestitution(0.6);
						//alert("Here0003");
						current=0;
					}
					else if(BUD=='portal' && DUD=='portal' && AUD=='obj' && fbB==temp2 && rset==1 && bset==1)
					{
						fxA.SetRestitution(0.6);
						//alert("Here0004");
						current=0;
					}
					if(BUD=='conveyor' && AUD=='obj')
					{
					var index = pull.indexOf(fbB); 
					pull.splice(index,1);
					}
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
					if(bcreate==1 && userdata=='portal' && temp2!=b)
					{
						temp=b;
						bset=1;
						//portals(temp,temp2);
						console.log("Blueportal");
					}
					if(rcreate==1 && userdata=='portal' && temp!=b)
					{
						temp2=b;
						rset=1;
						//portals(temp2,temp);
						console.log("Redportal");
					}
                }
            }
        }
        intersectionPoint.x = p1.x + closestFraction * (p2.x - p1.x);
        intersectionPoint.y = p1.y + closestFraction * (p2.y - p1.y);
        normalEnd.x = intersectionPoint.x + intersectionNormal.x;
        normalEnd.y = intersectionPoint.y + intersectionNormal.y;
        ctx.strokeStyle = "rgba(255, 255, 255, 10)";
        ctx.lineWidth = 5;
        ctx.bordercolor = 'red';
        ctx.borderwidth = 10;
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
            case 37:
                var mass = wheel.GetMass() * 10;
                wheel.ApplyImpulse(new b2Vec2(-0.1*mass, 0), wheel.GetPosition());
                break;
            case 38:
                var mass = wheel.GetMass() * 10;
                wheel.ApplyImpulse(new b2Vec2(0, -0.5*mass), wheel.GetPosition());
                break;
            case 39:
                var mass = wheel.GetMass() * 10;
                wheel.ApplyImpulse(new b2Vec2(0.1*mass, 0), wheel.GetPosition());
                break;
            case 40:
                var mass = wheel.GetMass() * 10;
                wheel.ApplyImpulse(new b2Vec2(0, 0.1*mass), wheel.GetPosition());
                break;
            case 79:
                circle = 1;
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
        switch (keycode)
        {
            case 79:circle = 0;
					break;
            default:break;
        }
    }

    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(30); //define scale
    debugDraw.SetFillAlpha(0.1); //define transparency
    debugDraw.SetLineThickness(0.1);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
    var winx = 7 * scale * xlimit / 1200;
    var winy = ylimit - (19 * scale * ylimit / 900);

    window.onload = function()
    {
		redportal.x=0;
		redportal.y=0;
		blueportal.x=100;
		blueportal.y=100;
		redportal.color='rgba(215, 44, 44, 0.6)';
		blueportal.color='rgba(54, 161, 255, 0.6)';
        level1();
    }
