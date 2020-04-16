var tree = [];                                                       // Zmienne globalne przechowujące gałęzie drzewa jako obiekty.
var leaves = [];
var count = 0;                                                      // Licznik umożliwiający kontrolowanie ilości gąłęzi/kliknięc myszy.

function setup() {
    var canvas = createCanvas(700, 700);
    var a = createVector(width/2, height);
    var b = createVector(width/2, height - 200);
    var root = new Branch(a, b);
    tree[0] = root;
    var buttonGenerate = createButton("Kliknij aby wygerenrować kolejne gałęzie");
    var buttonSave = createButton("Zapisz obrazek");
    buttonGenerate.mousePressed(generate);
    buttonSave.mousePressed(save);
    canvas.parent(canvasObj);
    buttonGenerate.parent(buttonObj);
    buttonSave.parent(buttonObj);
}
function generate(){                                                  //Funkcja tworząca następne gałęzie przy kliknięciu myszy.
    for (var i = tree.length - 1; i >= 0; i--){                      //Tablicę gałęzi sprawdzamy "od tyłu" aby nie doszło do nieskończonej
        if (!tree[i].finished) {                                     // Zmienna finished zapobieda tworzeniu po raz kolejny istniejących juz gałęzi
            tree.push(tree[i].branchA());                            // Zmienna finished zapobieda tworzeniu po raz kolejny istniejących juz gałęzi
            tree.push(tree[i].branchB());
        }
        tree[i].finished = true;
    }
    count++;

    if (count % 3 === 0){
        for (var i = 0; i < tree.length; i++){
            if(!tree[i].finished){
                var leaf = tree[i].end.copy();                        //Tworzenie współrzędnych liści na 3 gałęzi
                leaves.push(leaf);                                   // przezkopiowanie wspołrzędnej końcowej tej gałęzi oraz dodanie ich do tablicy.
            }
        }
    }
}

function draw() {
    background('#323232');
    for(var i = 0; i < tree.length; i++){
        tree[i].show();                                             //Wyświetlenie naszego drzewa na "płótnie".
    }
    for(var i = 0; i < leaves.length; i++){
        fill(255, 0, 100, 200);
        noStroke();
        ellipse(leaves[i].x, leaves[i].y, 10, 10);
        leaves[i].y += random(1, 5);                                 //Spadające liście.
        leaves[i].x += random(-2, 2);
    }
}

function save(){                                                        //funkcja do zapisania obrazu
    save();
}
