var slider;
var angle = 0;
var canvas;

function setup() {
    canvas = createCanvas(700, 700);                             //funkcja framework P5 tworząca "płótno"
    slider = createSlider(0, TWO_PI, PI / 4, 0.01);              //tworzymy Slider który przyda się do dynamicznj zmiany kąta odbicie każdej kolejnej gałęzi
    canvas.parent(canvasRek);                                    //wykorzystanie funkcji parent() w celu umieszczenia obiektu canvas w dowlonymi miejscu na stronie
    slider.parent(canvasRek);
    var buttonSave = createButton("Zapisz obrazek");
    // var buttonGif = createButton("Zapisz gif");
    buttonSave.mousePressed(save);
    buttonSave.parent(buttonRek);
    // buttonGif.mousePressed(saveGif);
}

function draw() {
    background('#323232');                                       //funkcja ustalająca kolor tła
    angle = slider.value();                                      //kąt o który odbija się każda kolejna gałąź
    stroke(255);                                                 // funkcja ustalająca kolor lini
    translate(350, height);                                      // funkcja przesuwająca miejsce z którego będziemy rysować na ś
    branch(200)                                             //wywołanie funkcji branch
}

function branch(len){
    line(0, 0, 0, - len)                                        //funckja rysująca linię frameworku P5
    translate(0, -len)
    if(len > 4) {                                               //zapobiegnięcie próbie narysowania nieskończonego kształtu
        push();                                                 // "zapisanie" miejsca w którym obecnie jest
        rotate(angle);                                          //obrót
        branch(len*0.67);                                  //funkcja wywołuje samą siebie ze skróconym argumentem
        pop();                                                  //"wczytanie" miejsca które było zapisane
        push();
        rotate(-angle);                                        //obrót w drugą stronę
        branch(len * 0.67);
        pop();

    }
}

function save(){                                                 //funkcja zapisująca obraz
    save();
}

// function saveGif(){
//     saveFrames('out', 'png', 3, 25);
// }