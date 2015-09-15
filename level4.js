function level4()
    {
        for (b = world.GetBodyList(); b; b = b.GetNext())
        {
            if (b != wheel)
                world.DestroyBody(b);
        }
		
		var winx4 =19 * scale * xlimit / 1200;
		var winy4 = ylimit - (17 * scale * ylimit / 900);
		
		var start4=new b2Vec2(5*xlimit/1200,10*ylimit/900);
		wheel.SetPosition(start4);
        
		console.log("Fourth level");
		
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
        bodyDef.position.Set(5 * xlimit / 1200, (ylimit / scale) - (1 * ylimit / 900));
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(5 * xlimit / 1200, 1 * ylimit / 900);
        var ground1 = world.CreateBody(bodyDef);
        ground1.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(5 * xlimit / 1200, (ylimit / scale) - (2.1 * ylimit / 900));
		bodyDef.userData='portal';
        var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(3 * xlimit / 1200, 0.1 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var p12 = world.CreateBody(bodyDef);
        p12.CreateFixture(fd1);
		
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(35 * xlimit / 1200, (ylimit / scale) - (25 * ylimit / 900));
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(5 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var roof = world.CreateBody(bodyDef);
        roof.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(35 * xlimit / 1200, (ylimit / scale) - (23.9 * ylimit / 900));
		bodyDef.userData='portal';
        var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(3 * xlimit / 1200, 0.1 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var p13 = world.CreateBody(bodyDef);
        p13.CreateFixture(fd1);
		
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(35 * xlimit / 1200, (ylimit / scale) - (5 * ylimit / 900));
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(3 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 3.5*Math.PI/4);
        var tilt = world.CreateBody(bodyDef);
        tilt.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(35 * xlimit / 1200, (ylimit / scale) - (5 * ylimit / 900));
		bodyDef.userData='bounce';
        var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(3 * xlimit / 1200, 1.2 * ylimit / 900, new b2Vec2(0, 0), 3.5*Math.PI/4);
        fd1.isSensor = true;
		var bounce1 = world.CreateBody(bodyDef);
        bounce1.CreateFixture(fd1);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(19 * xlimit / 1200, (ylimit / scale) - (21 * ylimit / 900));
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(3 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var platform2 = world.CreateBody(bodyDef);
        platform2.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(19 * xlimit / 1200, (ylimit / scale) - (21 * ylimit / 900));
		bodyDef.userData='bounce';
        var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(3 * xlimit / 1200, 1.2 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var bounce2 = world.CreateBody(bodyDef);
        bounce2.CreateFixture(fd1);
		
		
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(19 * xlimit / 1200, (ylimit / scale) - (10 * ylimit / 900));
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(3 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var platform = world.CreateBody(bodyDef);
        platform.CreateFixture(fd);
		
        update4();

        function update4()
        {
            world.Step(1 / 60, 10, 10);
			world.SetContactListener(listener);
            world.DrawDebugData();
            world.ClearForces();
			active();
			if(shouldmove==1)
			{
				wheel.SetPosition(newpo);
				wheel.SetLinearVelocity(vel);
				shouldmove=0;
			}
			if(shouldbounce==1)
			{
				wheel.SetLinearVelocity(vspeed);
				shouldbounce=0;
			}
			if(bset>0)
			{
				console.log("blue");
				blueportal.draw();
			}
			if(rset>0)
			{
				console.log("red");
				redportal.draw();
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
            ctx.arc(winx4, winy4, 30 * (xlimit + ylimit) / (1200 + 900), 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            if (scope == 1)
                ray();
			if (Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx4, 2) + Math.pow(wheel.GetPosition().y * scale - winy4, 2)) > 50)
            {
                var frame4 = window.requestAnimationFrame(update4);
            }
            else
            {
				wheel.SetLinearVelocity(zero);
				wheel.SetAngularVelocity(0);
				rset=0;
				bset=0;
                level5();
            }
        };
    }
