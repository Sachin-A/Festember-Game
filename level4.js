function level4()
    {
		time=120000;
		levelnumber=4;
		$("#single2").html("<p>Level: " +levelnumber + "</p>");
		$("#time").html("Time left: " +time);
		$("#lives").html("Time left: " +lives);
		
		var currentCountDown = createCountDown(time); 
		
        for (b = world.GetBodyList(); b; b = b.GetNext())
        {
            if (b != wheel && b!=border1 && b!=border2 && b!=border3 && b!=border4)
                world.DestroyBody(b);
        }
		
		var winx4 =19 * scale * xlimit / 1200;
		var winy4 = ylimit - (17 * scale * ylimit / 900);
		
		var start4=new b2Vec2(5*xlimit/1200,10*ylimit/900);
		wheel.SetPosition(start4);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(5 * xlimit / 1200, (ylimit / scale) - (1 * ylimit / 900));
		bodyDef.userData='ground';
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
		bodyDef.userData='ground';
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
		bodyDef.userData='ground';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(3 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var tilt = world.CreateBody(bodyDef);
        tilt.CreateFixture(fd);
		tilt.SetAngle(3.5*Math.PI/4);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(35 * xlimit / 1200, (ylimit / scale) - (5 * ylimit / 900));
		bodyDef.userData='bounce';
        var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(3 * xlimit / 1200, 1.2 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var bounce1 = world.CreateBody(bodyDef);
        bounce1.CreateFixture(fd1);
		bounce1.SetAngle(3.5*Math.PI/4);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(19 * xlimit / 1200, (ylimit / scale) - (21 * ylimit / 900));
		bodyDef.userData='ground';
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
		bodyDef.userData='ground';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsOrientedBox(3 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var platform = world.CreateBody(bodyDef);
        platform.CreateFixture(fd);
		
        update4();

        function update4()
        {
			var timeleftgame = currentCountDown();
			var countDownValue = Math.floor(timeleftgame/1000);
			$("#time").html("Time left: " +countDownValue);
			if(countDownValue==0 && restart==false)
			{
				lives--;
				restart=true;
			}
			$("#score").html("Score: " +Math.floor(timeleftgame/1000*lives));
			$("#lives").html("Lives left: " +lives);
			if(escape==false && end==false)
			{
			document.getElementById('bouncei').style.display='block';
			document.getElementById('pause').style.display='none';
			document.getElementById('instructions').style.display='none';
			document.getElementById('canvas').style.backgroundColor='rgba(0, 0, 44, 0.8)';
            world.Step(1 / 60, 10, 10);
			draw();
			world.SetContactListener(listener);
            world.ClearForces();
			active();
			if(died==true)
				{
					wheel.SetPosition(start4);
					died=false;
				}
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
			if (count == 1)
            {
                ctx.fillStyle = "rgba(255,255,255,0.1)";
                ctx.beginPath();
                ctx.arc(wheel.GetPosition().x * scale, wheel.GetPosition().y * scale, 2 * scale, 0, Math.PI * 2, false);
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
			}
			if(escape==true && instruc==false)
			{
				ctx.clearRect(0,0, canvas.width, canvas.height);
				document.getElementById('canvas').style.backgroundColor='#3366FF';
				document.getElementById('pause').style.display='block';
				document.getElementById('bouncei').style.display='none';
			}
			if(escape==true && goback==true)
			{
				document.getElementById('pause').style.display='none';
				ctx.clearRect(0,0, canvas.width, canvas.height);
				end=true;
				window.cancelAnimationFrame(frame1);
				//level1();
			}
			if (Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx4, 2) + Math.pow(wheel.GetPosition().y * scale - winy4, 2)) > 50 && end==false)
            {
                var frame4 = window.requestAnimationFrame(update4);
            }
            if (Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx4, 2) + Math.pow(wheel.GetPosition().y * scale - winy4, 2)) < 50 && end==false)
            {
				wheel.SetLinearVelocity(zero);
				wheel.SetAngularVelocity(0);
				rset=0;
				bset=0;
				count=0;
				document.getElementById('bouncei').style.display='none';
                level1();
            }
        };
    }
