var bouncyball, database, position;

function setup(){
    createCanvas(500,500);
    database=firebase.database();
    bouncyball = createSprite(250,250,10,10);
    bouncyball.shapeColor = "red";
    var nball=database.ref('ball/position');
    nball.on("value",readposition,showerror);

}
function readposition(data){
  position= data.val();
  bouncyball.x=position.x;
  bouncyball.y=position.y;

}

function draw(){
    background("white");
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
}

function changePosition(x,y){
  database.ref('ball/positon').set({
      'x':position.x+x, 'y':position.y+y
  })
}
function showerror(){
    console.log("Position can't be read");
}
