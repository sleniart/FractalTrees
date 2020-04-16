var count = 1;
var len = 150;


var sets = [                                             //idividual rules for each nature similar object
    {
        axiom: "X",                                   
        angle: 20,
        rules: [
            {
                a: "F",
                b: "FF"
            },
            {
                a: "X",
                b: "F[+X]F[-X]+X"
            }
        ]
    },
    {
        axiom: " F",
        angle: 22.5,
        rules: [
            {
                a: "F",
                b: " FF+[+F-F-F]-[-F+F+F]"
            }
        ]
    },
    {
        axiom: "F",
        angle: 22.5,
        rules: [
            {
                a: "F",
                b: "FF-[XY]+[XY]"
            },
            {
                a: "X",
                b: "+FY"
            },
            {
                a: "Y",
                b: "-FX"
            }
        ]
    },
    {
        axiom: "F",
        angle: 35,
        rules: [
            {
                a: "F",
                b: "F[+FF][-FF]F[-F][+F]F"
            },
        ]
    },
    {
        axiom: "Y",
        angle: 27.5,
        rules: [
            {
                a: "X",
                b: "X[-FFF][+FFF]FX"
            },
            {
                a: "Y",
                b: "YFX[+Y][-Y]"
            }
        ]

    }
];

var sentence = sets[count].axiom;                                             //assign axiom for new sentence

function generate() {
    len *= 0.56;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {                              //check every next char at the sentence 
        var current = sentence.charAt(i)
        var found = false;                                                  //prevent from checking it from the begining
        for (var j = 0; j < sets[count].rules.length; j++) {
            if (current === sets[count].rules[j].a) {                      //if declared rule is fulfilled
                found = true;
                nextSentence += sets[count].rules[j].b;                     //then its add to sentence
                break;
            }
        }
        if (!found) {
            nextSentence += current;
        }
    }
    sentence = nextSentence;
    turtle();                                                                //calling draw function
}

function turtle(){                                                             
    background(51);
    resetMatrix();
    translate(width/2, height);
    stroke(255);
    for (var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);
        if (current === "F"){                                                  //F stands for "move forward by line length drwaing a line"
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current === "+") {                                          //+ rotate 
            rotate (radians(sets[count].angle));

        } else if (current === "-") {                                          //- rotate other side
            rotate (radians(-sets[count].angle));
        } else if (current === "["){                                           //"save" where we are atm
            push();
        } else if (current === "]"){                                            //"load" saved position
            pop();
        }
    }
}

function nextRule(){                                                            //changing rules
    if (count < sets.length - 1){
        count ++;
    }
    else {
        count = 0;                                                                //looping moving between rules
    }
    background(51);								//reset background
    translate(width/2, height);                                                 //translate to original position
    sentence = sets[count].axiom;                                               //set new axiom
    len = 150;                                                                   //reset to original length 
}

function previousRule(){
    if (count > 0){
        count--;
    }
    else {
        count = sets.length - 1; 
    }
    background(51);
    translate(width/2, height);
    sentence = sets[count].axiom;
    len = 200;

}

function save() {
    save();
}

function setup() {
    var canvas = createCanvas(700, 700);
    background(51);
    turtle();
    var buttonPrev = createButton("Previous rule");
    var button = createButton("Create next generation of branches");
    var buttonNext = createButton("Next rule");
    var buttonSave = createButton("Save");
    button.mousePressed(generate);
    buttonPrev.mousePressed(previousRule);
    buttonNext.mousePressed(nextRule);
    buttonSave.mousePressed(save);
    canvas.parent(canvasLs);
    button.parent(buttonLs);
    buttonPrev.parent(buttonLs);
    buttonNext.parent(buttonLs);
    buttonSave.parent(buttonLs);
}