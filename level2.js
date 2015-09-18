function level2()
    {
		time=60000;
		levelnumber=2;
		$("#single2").html("<p>Level: " +levelnumber + "</p>");
		$("#time").html("Time left: " +time);
		$("#lives").html("Time left: " +lives);
		
		var currentCountDown = createCountDown(time); 
		
        for (b = world.GetBodyList(); b; b = b.GetNext())
        {
            if (b != wheel && b!=border1 && b!=border2 && b!=border3 && b!=border4)
                world.DestroyBody(b);
        }
		
		var winx2 =35 * scale * xlimit / 1200;
		var winy2 = ylimit - (18 * scale * ylimit / 900);
		
		var start2=new b2Vec2(5*xlimit/1200,22*ylimit/900);
		wheel.SetPosition(start2);
		
		var mag=0;
		
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
			document.getElementById('portali').style.display='block';
			document.getElementById('pause').style.display='none';
			document.getElementById('instructions').style.display='none';
			document.getElementById('canvas').style.backgroundColor='rgba(0, 0, 44, 0.8)';
            world.Step(1 / 60, 10, 10);
			world.SetContactListener(listener);
			draw();
            world.ClearForces();
			active();
			if(died==true)
				{
					wheel.SetPosition(start2);
					died=false;
				}
			if(shouldmove==1)
			{
				wheel.SetPosition(newpo);
				wheel.SetLinearVelocity(vel);
				shouldmove=0;
			}
			if (count == 1)
            {
                ctx.fillStyle = "rgba(255,255,255,0.1)";
                ctx.beginPath();
                ctx.arc(wheel.GetPosition().x * scale, wheel.GetPosition().y * scale, 2 * scale, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            }
			ctx.fillStyle = "rgba(0, 57, 255, 1)";
            ctx.beginPath();
            ctx.arc(winx2, winy2, 15 * (xlimit + ylimit) / (1200 + 900), 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
			if(a==15)a=0;
			a=a+1;
			ctx.strokeStyle = "rgba(255, 255, 255, 1)";
			ctx.beginPath();
			ctx.arc(winx2, winy2, a * (xlimit + ylimit) / (1200 + 900), 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.stroke();
            if (scope == 1)
                ray();
			}
			if(escape==true && instruc==false)
			{
				ctx.clearRect(0,0, canvas.width, canvas.height);
				document.getElementById('canvas').style.backgroundColor='#3366FF';
				document.getElementById('pause').style.display='block';
				document.getElementById('portali').style.display='none';
			}
			if(escape==true && goback==true)
			{
				document.getElementById('pause').style.display='none';
				ctx.clearRect(0,0, canvas.width, canvas.height);
				end=true;
				window.cancelAnimationFrame(frame1);
				//level1();
			}
			if (Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx2, 2) + Math.pow(wheel.GetPosition().y * scale - winy2, 2)) > 50 && end==false)
            {
                var frame2 = window.requestAnimationFrame(update2);
            }
            if(Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx2, 2) + Math.pow(wheel.GetPosition().y * scale - winy2, 2)) < 50 && end==false)
            {
				document.getElementById('portali').style.display='none';
				wheel.SetLinearVelocity(zero);
				wheel.SetAngularVelocity(0);
				rset=0;
				bset=0;
				count=0;
                level3();
            }
        };
    }
