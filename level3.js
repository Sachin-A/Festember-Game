function level3()
    {
		time=180000;
		levelnumber=3;
		$("#single2").html("<p>Level: " +levelnumber + "</p>");
		$("#time").html("Time left: " +time);
		$("#lives").html("Time left: " +lives);
		var currentCountDown = createCountDown(time); 
		
        for (b = world.GetBodyList(); b; b = b.GetNext())
        {
            if (b != wheel && b!=border1 && b!=border2 && b!=border3 && b!=border4)
                world.DestroyBody(b);
        }
		var start3=new b2Vec2(4*xlimit/1200,25*ylimit/900);
		wheel.SetPosition(start3);
		
		var winx3 =13 * scale * xlimit / 1200;
		var winy3 = ylimit - (19 * scale * ylimit / 900);
		
		var mag1=0;
		var mag2=0;
		var mag3=0;
		
        // Ground 1
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
		var p1 = world.CreateBody(bodyDef);
        p1.CreateFixture(fd1);

        // Ground 2
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set((xlimit / scale) - (9 * xlimit / 1200), (ylimit / scale) - (1 * ylimit / 900));
		bodyDef.userData='ground';
        var fd = new b2FixtureDef;
        fd.shape = new b2PolygonShape;
        fd.shape.SetAsBox(5 * xlimit / 1200, 1 * ylimit / 900);
        var ground2 = world.CreateBody(bodyDef);
        ground2.CreateFixture(fd);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set((xlimit / scale) - (9 * xlimit / 1200), (ylimit / scale) - (2.1 * ylimit / 900));
		bodyDef.userData='portal';
        var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(3 * xlimit / 1200, 0.1 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var p2 = world.CreateBody(bodyDef);
        p2.CreateFixture(fd1);

        // First floor
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(17 * xlimit / 1200, (ylimit / scale) - (11 * ylimit / 900));
		bodyDef.userData='carrier';
        var floor = new b2FixtureDef;
        floor.shape = new b2PolygonShape();
        floor.shape.SetAsOrientedBox(17 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var firstfloor = world.CreateBody(bodyDef);
        firstfloor.CreateFixture(floor);

        //c1b1
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(3 * xlimit / 1200, (ylimit / scale) - (9 * ylimit / 900));
		bodyDef.userData='cbox';
        var box1 = new b2FixtureDef;
        box1.shape = new b2PolygonShape();
        box1.shape.SetAsOrientedBox(3 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
		var c1b1 = world.CreateBody(bodyDef);
        c1b1.CreateFixture(box1);
			
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
		bodyDef.position.Set(3 * xlimit / 1200, (ylimit / scale) - (9 * ylimit / 900));
		bodyDef.userData='conveyor';
		var fixDef2 = new b2FixtureDef;
        fixDef2.shape = new b2CircleShape(5* xlimit / 1200);
        fixDef2.shape.SetLocalPosition(new b2Vec2(0, 0));
        fixDef2.density = 0;
        fixDef2.isSensor = true;
        var CC1 = world.CreateBody(bodyDef);
        CC1.CreateFixture(fixDef2);
        
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(3 * xlimit / 1200, (ylimit / scale) - (7.9 * ylimit / 900));
		bodyDef.userData='portal';
		var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(1.5 * xlimit / 1200, 0.1 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var p3= world.CreateBody(bodyDef);
		p3.CreateFixture(fd1);

        //lift
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set((xlimit / scale) - (0.5 * xlimit / 1200), (ylimit / scale) - (12 * ylimit / 900));
		bodyDef.userData='carrier';
        var f = new b2FixtureDef;
        f.shape = new b2PolygonShape();
        f.shape.SetAsOrientedBox(0.5 * xlimit / 1200, 12 * ylimit / 900, new b2Vec2(0, 0), 0);
        var lift = world.CreateBody(bodyDef);
        lift.CreateFixture(f);
		
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set((xlimit / scale) - (1.5 * xlimit / 1200), (ylimit / scale) - (2 * ylimit / 900));
		bodyDef.userData='cbox';
        var b1 = new b2FixtureDef;
        b1.shape = new b2PolygonShape();
        b1.shape.SetAsOrientedBox(2 * ylimit / 900, 0.5 * xlimit / 1200, new b2Vec2(0, 0), 0);
        var c2b1 = world.CreateBody(bodyDef);
        c2b1.CreateFixture(b1);
		c2b1.SetAngle(Math.PI/2);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
		bodyDef.position.Set((xlimit / scale) - (1.5 * xlimit / 1200), (ylimit / scale) - (2 * ylimit / 900));
		bodyDef.userData='conveyor';
		var fixDef2 = new b2FixtureDef;
        fixDef2.shape = new b2CircleShape(5* xlimit / 1200);
        fixDef2.shape.SetLocalPosition(new b2Vec2(0, 0));
        fixDef2.density = 0;
        fixDef2.isSensor = true;
        var CC2 = world.CreateBody(bodyDef);
        CC2.CreateFixture(fixDef2);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set((xlimit / scale) - (2.1 * xlimit / 1200), (ylimit / scale) - (2 * ylimit / 900));
		bodyDef.userData='portal';
		var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(1 * xlimit / 1200, 0.1 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var p4= world.CreateBody(bodyDef);
		p4.CreateFixture(fd1);
		p4.SetAngle(Math.PI/2);

        // intermediate floor
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(17 * xlimit / 1200, (ylimit / scale) - (16 * ylimit / 900));
		bodyDef.userData='ground';
        var floor = new b2FixtureDef;
        floor.shape = new b2PolygonShape();
        floor.shape.SetAsOrientedBox(17 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var Ifloor = world.CreateBody(bodyDef);
        Ifloor.CreateFixture(floor);

        // Second floor
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(25 * xlimit / 1200, (ylimit / scale) - (29 * ylimit / 900));
		bodyDef.userData='carrier';
        var floor2 = new b2FixtureDef;
        floor2.shape = new b2PolygonShape();
        floor2.shape.SetAsOrientedBox(15 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var floor2 = world.CreateBody(bodyDef);
        floor2.CreateFixture(floor);
        
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(13 * xlimit / 1200, (ylimit / scale) - (27 * ylimit / 900));
		bodyDef.userData='cbox';
        var bx1 = new b2FixtureDef;
        bx1.shape = new b2PolygonShape();
        bx1.shape.SetAsOrientedBox(3 * xlimit / 1200, 1 * ylimit / 900, new b2Vec2(0, 0), 0);
        var c3b1 = world.CreateBody(bodyDef);
        c3b1.CreateFixture(bx1);
		
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
		bodyDef.position.Set(13 * xlimit / 1200, (ylimit / scale) - (27 * ylimit / 900));
		bodyDef.userData='conveyor';
		var fixDef2 = new b2FixtureDef;
        fixDef2.shape = new b2CircleShape(6);
        fixDef2.shape.SetLocalPosition(new b2Vec2(0, 0));
        fixDef2.density = 0;
        fixDef2.isSensor = true;
        var CC3 = world.CreateBody(bodyDef);
        CC3.CreateFixture(fixDef2);
        
		var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(13 * xlimit / 1200, (ylimit / scale) - (25.9 * ylimit / 900));
		bodyDef.userData='portal';
		var fd1 = new b2FixtureDef;
        fd1.shape = new b2PolygonShape;
        fd1.shape.SetAsOrientedBox(1.5 * xlimit / 1200, 0.1 * ylimit / 900, new b2Vec2(0, 0), 0);
        fd1.isSensor = true;
		var p5= world.CreateBody(bodyDef);
		p5.CreateFixture(fd1);
		
		
		function conveyor_motion()
        {
            var b = new b2BodyDef();
            for (b = world.GetBodyList(); b; b = b.GetNext())
            {
                if (b == c1b1 || b == p3 || b == CC1)
                {
                    if (b.GetPosition().x >= 31 * xlimit / 1200)
                        mag1=-0.1;
					if(b.GetPosition().x <= 3 * xlimit / 1200)
						mag1=0.1;
                    var movex = b.GetPosition().x + (mag1 * xlimit / 1200);
                    var movey = b.GetPosition().y;
                    var move = new b2Vec2(movex, movey);
                    b.SetPosition(move);
                }
				if (b == c2b1 || b == p4 || b == CC2)
                {
                    if (b.GetPosition().y >= 27 * ylimit / 900)
                        mag2=-0.2;
					if (b.GetPosition().y <= 8 * ylimit / 900)
						mag2=0.2;
                    var movey = b.GetPosition().y + (mag2 * ylimit / 900);
                    var movex = b.GetPosition().x;
                    var move = new b2Vec2(movex, movey);
                    b.SetPosition(move);
                }
				if (b == c3b1 || b == p5 || b == CC3)
                {
                    if (b.GetPosition().x >= 37 * xlimit / 1200)
                        mag3=-0.1;
					if(b.GetPosition().x <= 13 * xlimit / 1200)
						mag3=0.1;
                    var movex = b.GetPosition().x + (mag3 * xlimit / 1200);
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
                force.x = 1500 * vecnew.x;
                force.y = 2500 * vecnew.y;
                wheel.ApplyForce(force, wheel.GetWorldCenter());
                wheel.SetAngularDamping(10);
            }
        }

        update3();

        function update3()
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
			document.getElementById('pause').style.display='none';
			document.getElementById('instructions').style.display='none';
			document.getElementById('canvas').style.backgroundColor='rgba(0, 0, 44, 0.8)';
            world.Step(1 / 60, 10, 10);
            draw();
            world.ClearForces();
            world.SetContactListener(listener);
            //fpsa.innerHTML = fps.getFPS();
            conveyor_motion();
			active();
			if(died==true)
				{
					temp2=temp2died;
					temp=tempdied;
					wheel.SetPosition(start3);
					died=false;
				}
			if(count==1)
			{
				attach();
				ctx.fillStyle = "rgba(255,255,255,0.1)";
                ctx.beginPath();
                ctx.arc(wheel.GetPosition().x * scale, wheel.GetPosition().y * scale, 2 * scale, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
			}
			if(shouldmove==1)
			{
				wheel.SetPosition(newpo);
				wheel.SetLinearVelocity(vel);
				shouldmove=0;
			}
            if (scope == 1)
            {
                ray();
            }
            ctx.fillStyle = "rgba(0, 57, 255, 1)";
            ctx.beginPath();
            ctx.arc(winx3, winy3, 15 * (xlimit + ylimit) / (1200 + 900), 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
			if(a==15)a=0;
			a=a+1;
			ctx.strokeStyle = "rgba(255, 255, 255, 1)";
			ctx.beginPath();
			ctx.arc(winx3, winy3, a * (xlimit + ylimit) / (1200 + 900), 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.stroke();
			}
			if(escape==true && instruc==false)
			{
				ctx.clearRect(0,0, canvas.width, canvas.height);
				document.getElementById('canvas').style.backgroundColor='#3366FF';
				//ctx.fillstyle('#3366FF');
				//ctx.fillRect(0,0,canvas.width, canvas.height);
				document.getElementById('pause').style.display='block';
				//document.getElementById('single').innerHTML="";
				//document.getElementById('escape').style.display='block';
				//document.getElementById('escape').innerHTML="You've paused the game";
			}
			if(escape==true && goback==true)
			{
				document.getElementById('pause').style.display='none';
				ctx.clearRect(0,0, canvas.width, canvas.height);
				end=true;
				window.cancelAnimationFrame(frame1);
				//level1();
			}
            if (Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx3, 2) + Math.pow(wheel.GetPosition().y * scale - winy3, 2)) > 50 && end==false)
            {
                var frame3 = window.requestAnimationFrame(update3);
            }
            if (Math.sqrt(Math.pow(wheel.GetPosition().x * scale - winx3, 2) + Math.pow(wheel.GetPosition().y * scale - winy3, 2)) < 50 && end==false)
            {
				wheel.SetLinearVelocity(zero);
				wheel.SetAngularVelocity(0);
				rset=0;
				bset=0;
				count=0;
                level4();
            }
        };
    }
