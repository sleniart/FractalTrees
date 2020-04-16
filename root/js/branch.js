function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    var angle = PI / 4;

    this.show = function () {                                            //displays our branches
        stroke(255);                                                     //p5 - line color
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.branchA = function () {                                         //creating right branch
        var dir = p5.Vector.sub(this.end, this.begin);                   //creating direction vector
        dir.rotate(angle);                                               //rotate 
        dir.mult(0.67);                                                  //shorten
        var newEnd = p5.Vector.add(this.end, dir);                       //new end
        var b = new Branch(this.end, newEnd)
        return b;

    }
    this.branchB = function () {
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-angle);                                              //rotate other site
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);
        var b = new Branch(this.end, newEnd);
        return b;
    }
}