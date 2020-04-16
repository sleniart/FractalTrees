function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    var angle = PI / 4;

    this.show = function () {                                            //Funkcja wyswietlająca nasze gałęzie
        stroke(255);                                                     //p5 - kolor linii.
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.branchA = function () {                                         //Funkcja tworząca prawą gałąź.
        var dir = p5.Vector.sub(this.end, this.begin);                   //Tworzenie wektora kierunku.
        dir.rotate(angle);                                               //Obrócenie go o wybrany kąt.
        dir.mult(0.67);                                                  //Skrócenie.
        var newEnd = p5.Vector.add(this.end, dir);                       //Tworzenie nowego końca.
        var b = new Branch(this.end, newEnd)
        return b;

    }
    this.branchB = function () {
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-angle);                                              //Obrócenie w druga strone
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);
        var b = new Branch(this.end, newEnd);
        return b;
    }
}