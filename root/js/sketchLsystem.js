var count = 1;
var len = 150;


var sets = [                                             //zbior indywidualnych zasad dla kazdego ksztaltu
    {
        axiom: "X",                                    //deklaracja axiomatów i zbioru zasad
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

var sentence = sets[count].axiom;                                             //przypisanie axiomatu do nowej zmiennej

function generate() {
    len *= 0.56;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {                              //petla sprawdzajaca kazda kolejna litere zdania
        var current = sentence.charAt(i)
        var found = false;                                                  //zapobieganie sprawdzania tego samego ciągle od nowa
        for (var j = 0; j < sets[count].rules.length; j++) {
            if (current === sets[count].rules[j].a) {                      //jeżeli spełniony jest warunek zasad
                found = true;
                nextSentence += sets[count].rules[j].b;                     //to do zdania zostaje przypisana wartosc mu odpowiadajaca
                break;
            }
        }
        if (!found) {
            nextSentence += current;
        }
    }
    sentence = nextSentence;
    turtle();                                                                //wywołanie funkcji rysujacej
}

function turtle(){                                                             //funkcja rysujaca
    background(51);
    resetMatrix();
    translate(width/2, height);
    stroke(255);
    for (var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);
        if (current === "F"){                                                  //F jako instrukcja "move forward by line length drwaing a line" dla naszego "żółwia"
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current === "+") {                                          //+ jako obrót w jedną stronę
            rotate (radians(sets[count].angle));

        } else if (current === "-") {                                          // a - jako obrót w drugą
            rotate (radians(-sets[count].angle));
        } else if (current === "["){                                           //znane już "zapisanie" obecnego miejsca "żółwia"
            push();
        } else if (current === "]"){                                            //wczytanie jego pozycji
            pop();
        }
    }
}

function nextRule(){                                                            //metoda odpowiadająca za zmianę zasad
    if (count < sets.length - 1){
        count ++;
    }
    else {
        count = 0;                                                                //"zapętlenie" zmiany zasad
    }
    background(51);
    translate(width/2, height);                                                 //powrót "żółwia" do pierwotnej pozycji
    sentence = sets[count].axiom;                                               //ustalenie nowego axiomatu
    len = 150;                                                                   //powrót do pierwotnej długości
}

function previousRule(){
    if (count > 0){
        count--;
    }
    else {
        count = sets.length - 1; // "zapętlenie" zmiany zasad
    }
    background(51);
    translate(width/2, height);
    sentence = sets[count].axiom;
    len = 200;

}

function save() { //funkcja zapisująca obraz
    save();
}

function setup() {
    var canvas = createCanvas(700, 700);
    background(51);
    turtle();
    var buttonPrev = createButton("Poprzedni zbiór zasad"); //utworzenie przycisków
    var button = createButton("Utwórz kolejną generację gałęzi");
    var buttonNext = createButton("Następny zbiór zasad");
    var buttonSave = createButton("Zapisz obrazek");
    button.mousePressed(generate); //przypisanie akcji do każdego z przycisków
    buttonPrev.mousePressed(previousRule);
    buttonNext.mousePressed(nextRule);
    buttonSave.mousePressed(save);
    canvas.parent(canvasLs);
    button.parent(buttonLs);
    buttonPrev.parent(buttonLs);
    buttonNext.parent(buttonLs);
    buttonSave.parent(buttonLs);
}