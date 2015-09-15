function level2()
    {
        for (b = world.GetBodyList(); b; b = b.GetNext())
        {
            if (b != wheel)
                world.DestroyBody(b);
        }
		
		var winx2 =35 * scale * xlimit / 1200;
		var winy2 = ylimit - (18 * scale * ylimit / 900);
		
		var start2=new b2Vec2(5*xlimit/1200,22*ylimit/900);
		wheel.SetPosition(start2);
        
		console.log("Second level");
		
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
        bodyDef.position.Set(5 * xlimit / 1200, (ylimit / scale) - (1 * ylimit / 900));
		bodyDef.userData='ground';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(5 * xlimit / 1200, 1 * ylimit / 900);
        var ground = world.CreateBody(bodyDef);
        ground.CreateFixture(fd);
		
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(35 * xlimit / 1200, (ylimit / scale) - (29 * ylimit / 900));
		bodyDef.userData='ground';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(5 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var roof = world.CreateBody(bodyDef);
        roof.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(35 * xlimit / 1200, (ylimit / scale) - (15 * ylimit / 900));
		bodyDef.userData='ground';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(5 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var roof2 = world.CreateBody(bodyDef);
        roof2.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(5 * xlimit / 1200, (ylimit / scale) - (2.1 * ylimit / 900));
		bodyDef.userData='portal';
        var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(3 * xlimit / 1200, 0.1 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var p1 = world.CreateBody(bodyDef);
        p1.CreateFixture(fd1);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(35 * xlimit / 1200, (ylimit / scale) - (27.9 * ylimit / 900));
		bodyDef.userData='portal';
        var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(3 * xlimit / 1200, 0.1 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var p2 = world.CreateBody(bodyDef);
        p2.CreateFixture(fd1);
		
        update2();

        function update2()
        {
            world.Step(1 / 60, 10, 10);
			world.SetContactListener(listener);
            world.DrawDebugData();
            world.ClearForces();
			active();
			console.log(bset);
			console.log(rset);
			if(shouldmove==1)
			{
				wheel.SetPosition(newpo);
				wheel.SetLinearVelocity(vel);
				shouldmove=0;
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
            ctx.arc(winx2, winy2, 30 * (xlimit + ylimit) / (1200 + 900), 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            if (scope == 1)
                ray();
			if (Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx2, 2) + Math.pow(wheel.GetPosition().y * scale - winy2, 2)) > 50)
            {
                var frame2 = window.requestAnimationFrame(update2);
            }
            else
            {
				wheel.SetLinearVelocity(zero);
				wheel.SetAngularVelocity(0);
				rset=0;
				bset=0;
                level3();
            }
        };
    }
