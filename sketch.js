var bgi,player_running,banai,s1,go1,stn,go,bg,score,player,ground,fg,sg;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  bgi=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banai = loadImage("banana.png");
  s1= loadImage("stone.png");
  go1 = loadImage("go.png"); 
}

function setup(){
  createCanvas(750,400);
  bg=createSprite(0,0,800,400);
  bg.addImage(bgi);
  bg.scale=1.5;
  bg.x=bg.width/2;
  bg.velocityX=-4; 
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.08;   
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/16;
  ground.visible=false;
  go = createSprite(400,200,50,50);
  go.addImage(go1);
  go.scale = 1;
  go.visible = false; 
  fg = new Group();
  sg = new Group();
  score = 0;
}

function draw(){
  background(0);
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 600,50);
  if(gameState===PLAY){
    if(bg.x<0){
      bg.x=bg.width/2;
    }
    if(keyDown("space") && player.y>200) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);
    sb();
    ss(); 
    if(fg.isTouching(player)){
      fg[0].destroy();
      score += 1;
      player.scale +=+0.01;
      }if(sg.isTouching(player)){
        gameState = END;        
    }
  }
  else if(gameState ===  END){
  bg.velocityX = 0;
  player.visible = false;
  fg.destroyEach();
  sg.destroyEach();
  go.visible = true;
  }
 drawSprites();  
}

function sb(){
  if(frameCount%60===0){
    var bana = createSprite(800,250,40,10);
    bana.y = random(50,300);
    bana.addImage(banai);
    bana.scale= 0.06;
    bana.velocityX=-4;
    bana.lifetime=400;
    player.depth=bana.depth+1;
    fg.add(bana);
  }
}

function ss(){ 
  if(frameCount%80===0){
    var stn = createSprite(800,320,20,50);
    stn.addImage(s1);
    stn.scale = 0.15;
    stn.velocityX=-6;
    stn.lifetime=400;
    player.depth=stn.depth+1;
    sg.add(stn); 
}
}