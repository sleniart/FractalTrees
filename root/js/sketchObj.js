var tree = [];                                                       //Global var to keep branch as an object
var leaves = [];
var count = 0;                                                      // Helping counter

function setup() {
    var canvas = createCanvas(700, 700);
    var a = createVector(width/2, height);
    var b = createVector(width/2, height - 200);
    var root = new Branch(a, b);
    tree[0] = root;
    var buttonGenerate = createButton("Click to generate");
    var buttonSave = createButton("Save");
    buttonGenerate.mousePressed(generate);
    buttonSave.mousePressed(save);
    canvas.parent(canvasObj);
    buttonGenerate.parent(buttonObj);
    buttonSave.parent(buttonObj);
}
function generate(){                                                  //creating next level of branches each mouse click
    for (var i = tree.length - 1; i >= 0; i--){                      //we check array from the end to prevent infinite loop
        if (!tree[i].finished) {                                     
            tree.push(tree[i].branchA());                            
            tree.push(tree[i].branchB());
        }
        tree[i].finished = true;			          
    }
    count++;

    if (count % 3 === 0){
        for (var i = 0; i < tree.length; i++){
            if(!tree[i].finished){
                var leaf = tree[i].end.copy();                        //creating leaves at the 3rd gen
                leaves.push(leaf);                                   // copying end of branch coords to an array
            }
        }
    }
}

function draw() {
    background('#323232');
    for(var i = 0; i < tree.length; i++){
        tree[i].show();                                             //ispaly
    }
    for(var i = 0; i < leaves.length; i++){
        fill(255, 0, 100, 200);
        noStroke();
        ellipse(leaves[i].x, leaves[i].y, 10, 10);
        leaves[i].y += random(1, 5);                                 //falling leaves
        leaves[i].x += random(-2, 2);
    }
}

function save(){                                                       
    save();
}
