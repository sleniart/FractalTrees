var slider;
var angle = 0;
var canvas;

function setup() {
    canvas = createCanvas(700, 700);                             //p5 function to create canvas
    slider = createSlider(0, TWO_PI, PI / 4, 0.01);              //we need slider to dynamically change reflect angle
    canvas.parent(canvasRek);                                    //use parent() to place object anywhere on thie site
    slider.parent(canvasRek);
    var buttonSave = createButton("Save");
    buttonSave.mousePressed(save);
    buttonSave.parent(buttonRek);
}

function draw() {
    background('#323232');                                      
    angle = slider.value();                                      
    stroke(255);                                                 // defining line color
    translate(350, height);                                      // move starting drawing position to middle 
    branch(200)                                             
}

function branch(len){
    line(0, 0, 0, - len)                                        
    translate(0, -len)
    if(len > 4) {                                               //prevent create infinite figure
        push();                                                 // "save" where we are atm
        rotate(angle);                                          
        branch(len*0.67);                                  //recursion with shorten argument
        pop();                                                  //"load" where we were
        push();
        rotate(-angle);                                        
        branch(len * 0.67);
        pop();

    }
}

function save(){                                                 
    save();
}

// function saveGif(){
//     saveFrames('out', 'png', 3, 25);
// }