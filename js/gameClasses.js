class Point{
    constructor(x,y){
        this.X = x;
        this.Y = y;
    }
}
class Player{
    constructor(pos){
        this.Position = pos;
    }
}
class Block{
    constructor(pos, name, desc){
        this.Position = pos;
        this.Name = name;
        this.Description = desc;
    }
}
class GrassBlock extends Block{
    constructor(pos){
        super(pos, "Grass", "Just grass block :)");
    }
}
class Land extends Block{
    constructor(pos){
        super(pos, "Land", "Just a piece of land :)");
    }
}
class Game{
    constructor(size, seed, name){
        this.Seed = seed;
        this.Size = size;
        this.Name = name;
        if(!Number.isInteger(this.Seed)){
            var res = 0;
            for (let index = 0; index < this.Seed.length; index++) {
                res = ((res<<5)-res)+this.Seed.charCodeAt(index);
            }
            this.Seed = res;
        }
        this.Blocks = [];
        var currHeight = 5;
        var ChanceChangeHeight = 0.4;
        for (let x = 0; x < this.Size; x++) {
            this.Blocks.push(new GrassBlock(new Point(x, currHeight)));
            for (let y = 0; y < currHeight; y++) {
                this.Blocks.push(new Land(new Point(x, y)));
            }
            if(RandomNumber(0,1,this.Seed + x) < ChanceChangeHeight){
                if(currHeight <= 3) currHeight++;
                else if(currHeight >= 10) currHeight--;
                else{
                    if(RandomNumber(0,1,this.Seed+x+1) < 0.5) currHeight++;
                    else currHeight--;
                }
            }
        }
        this.Player = new Player(new Point(2, 10));
    }
}

function RandomNumber(min, max, seed) {
    return ((Math.sin(seed * seed) + 1) * 2) * (max - min) + min;
}