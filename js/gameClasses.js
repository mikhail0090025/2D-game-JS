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
        for (let index = 0; index < this.Size; index++) {
            this.Blocks.push(new GrassBlock(new Point(index, 50)));
            this.Blocks.push(new Land(new Point(index, 49)));
            this.Blocks.push(new Land(new Point(index, 48)));
            this.Blocks.push(new Land(new Point(index, 47)));
        }
    }
}