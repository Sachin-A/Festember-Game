function level1()
    {
        for (b = world.GetBodyList(); b; b = b.GetNext())
        {
            if (b != wheel)
                world.DestroyBody(b);
        }
		
		var winx1 =30 * scale * xlimit / 1200;
		var winy1 = ylimit - (4 * scale * ylimit / 900);
		
		var start1=new b2Vec2(10*xlimit/1200,25*ylimit/900);
		wheel.SetPosition(start1);
        console.log("First level");
		
		var mag=0;
        
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
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(20 * xlimit / 1200, 1 * ylimit / 900);
        var border4 = world.CreateBody(bodyDef);
        border4.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(10 * xlimit / 1200, (ylimit / scale) - (1 * ylimit / 900));
		bodyDef.userData='ground';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(5 * xlimit / 1200, 1 * ylimit / 900);
        var groundbasic = world.CreateBody(bodyDef);
        groundbasic.CreateFixture(fd);
		
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(30 * xlimit / 1200, (ylimit / scale) - (1 * ylimit / 900));
		bodyDef.userData='ground';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(5 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var groundbasic2 = world.CreateBody(bodyDef);
        groundbasic2.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(20 * xlimit / 1200, (ylimit / scale) - (12 * ylimit / 900));
		bodyDef.userData='carrier';
        var floor = new b2FixtureDef;
        floor.shape = new b2PolygonShape();
        floor.shape.SetAsOrientedBox(15 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var carrierbasic = world.CreateBody(bodyDef);
        carrierbasic.CreateFixture(floor);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set( 8* xlimit / 1200, (ylimit / scale) - (11 * ylimit / 900));
		bodyDef.userData='cbox';
        var fixDef = new b2FixtureDef;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsOrientedBox(3 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
		var cbbb = world.CreateBody(bodyDef);
        cbbb.CreateFixture(fixDef);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
		bodyDef.position.Set(8 * xlimit / 1200, (ylimit / scale) - (11 * ylimit / 900));
		bodyDef.userData='conveyor';
		var fixDef2 = new b2FixtureDef;
        fixDef2.shape = new b2CircleShape(5);
        fixDef2.shape.SetLocalPosition(new b2Vec2(0, 0));
        fixDef2.density = 0;
        fixDef2.isSensor = true;
        var CC10 = world.CreateBody(bodyDef);
        CC10.CreateFixture(fixDef2);
		
		function conveyor_motion()
        {
            var b = new b2BodyDef();
            for (b = world.GetBodyList(); b; b = b.GetNext())
            {
                if (b == cbbb || b == CC10)
                {
                    if (b.GetPosition().x >= 32 * xlimit / 1200)
                        mag=-0.1;
					if(b.GetPosition().x <= 8 * xlimit / 1200)
						mag=0.1;
                    var movex = b.GetPosition().x + (mag * xlimit / 1200);
                    var movey = b.GetPosition().y;
                    var move = new b2Vec2(movex, movey);
                    b.SetPosition(move);
                }
            }
        }
		
		function attach()
        {
			for (i = 0; i < pull.length; i++)
            {
                var c1 = wheel.GetWorldCenter();
                var c2 = pull[i].GetWorldCenter();
                var vecnew = new b2Vec2();
                vecnew.x = c2.x - c1.x;
                vecnew.y = c2.y - c1.y;
                var magnew = Math.sqrt(((vecnew.x * vecnew.x) + (vecnew.y * vecnew.y)));
                vecnew.x = vecnew.x / magnew;
                vecnew.y = vecnew.y / magnew;
                var force = new b2Vec2();
                force.x = 1440 * vecnew.x;
                force.y = 1440 * vecnew.y;
                wheel.ApplyForce(force, wheel.GetWorldCenter());
                wheel.SetAngularDamping(3);
            }
        }
		
        update1();

        function update1()
        {
            world.Step(1 / 60, 10, 10);
			world.SetContactListener(listener);
            world.DrawDebugData();
            world.ClearForces();
			conveyor_motion();
			active();
			if(count==1)
			{
				attach();
			}
			if (circle == 1)
            {
                ctx.fillStyle = "rgba(255,255,255,0.1)";
                ctx.beginPath();
                ctx.arc(wheel.GetPosition().x * scale, wheel.GetPosition().y * scale, 4 * scale, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            }
			ctx.fillStyle = 'rgba(145,145,255,0.5)';
            ctx.beginPath();
            ctx.arc(winx1, winy1, 30 * (xlimit + ylimit) / (1200 + 900), 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            if (scope == 1)
                ray();
			if (Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx1, 2) + Math.pow(wheel.GetPosition().y * scale - winy1, 2)) > 50)
            {
                var frame1 = window.requestAnimationFrame(update1);
            }
            else
            {
				wheel.SetLinearVelocity(zero);
				wheel.SetAngularVelocity(0);
				rset=0;
				bset=0;
                level2();
            }
        };
    }
