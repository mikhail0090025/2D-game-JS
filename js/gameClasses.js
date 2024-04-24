class Point{
    constructor(x,y){
        this.X = x;
        this.Y = y;
    }

    Distance(p2){
        return Math.sqrt((this.X - p2.X) * (this.X - p2.X) + (this.Y - p2.Y) * (this.Y - p2.Y));
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
class Stone extends Block{
    constructor(pos){
        super(pos, "Stone", "Just a piece of stone :)");
    }
}
class MetalOre extends Block{
    constructor(pos){
        super(pos, "Metal ore", "Metal ore can be used to get a metal");
    }
}
class GoldOre extends Block{
    constructor(pos){
        super(pos, "Gold ore", "Gold ore can be used to get a gold");
    }
}
class Bedrock extends Block{
    constructor(pos){
        super(pos, "Bedrock", "Unbreakable stone");
    }
}
class Game{
    constructor(size, seed, name){
        this.Seed = seed;
        this.Size = size;
        this.Name = name;
        var currHeight = StartWorldHeight;
        if(!Number.isInteger(this.Seed)){
            var res = 0;
            for (let index = 0; index < this.Seed.length; index++) {
                res = ((res<<5)-res)+this.Seed.charCodeAt(index);
            }
            this.Seed = res;
        }
        this.Blocks = [];
        for (let x = 0; x < this.Size; x++) {
            var stoneHeight = currHeight * RandomNumber(0.4, 0.7, this.Seed + x);
            this.Blocks.push(new GrassBlock(new Point(x, currHeight)));
            for (let y = 0; y < currHeight; y++) {
                if(y > stoneHeight){
                    this.Blocks.push(new Land(new Point(x, y)));
                }else if(y <= stoneHeight && y !== 0){
                    this.Blocks.push(new Stone(new Point(x, y)));
                }else if(y === 0){
                    this.Blocks.push(new Bedrock(new Point(x, y)));
                }
            }
            if(RandomNumber(0,1,this.Seed * x) < ChanceChangeHeight){
                if(currHeight <= MinGroundHeight) currHeight++;
                else if(currHeight >= MaxGroundHeight) currHeight--;
                else{
                    if(RandomNumber(0,1,this.Seed+x+1) < 0.5) currHeight++;
                    else currHeight--;
                }
            }
            if(currHeight > MaxAvailableHeight) throw new Error("Error: Height is over than allowed!");
        }

        // ORES GENERATION
        this.Blocks.forEach((block, index) => {
            if(block instanceof Stone && RandomNumber(0,1,index*index) < MetalOrePropability){
                this.Blocks[index] = new MetalOre(this.Blocks[index].Position);
            }
            else if(block instanceof Stone && RandomNumber(0,1,index*index*index) < GoldOrePropability){
                this.Blocks[index] = new GoldOre(this.Blocks[index].Position);
            }
        });

        // BLOCK MATRIX CREATION
        this.Matrix = [];
        for (let index = 0; index < this.Size; index++) {
            this.Matrix.push([]);
            for (let index2 = 0; index2 < MaxAvailableHeight; index2++) {
                this.Matrix[index].push({});
            }
        }
        this.Blocks.forEach(block => {
            this.Matrix[block.Position.X][block.Position.Y] = block;
        });

        // MINES
        function NewMine(seed_, Blocks, Matrix, Size) {
            var block = Blocks[Math.round(RandomNumber(0, Blocks.length - 1, seed_))];
            var attempts = 1;
            while (!(block instanceof Stone)) {
                attempts++;
                let ind = Math.round(RandomNumber(0, Blocks.length - 1, seed_ * attempts));
                block = Blocks[ind];
                if(attempts > 200){
                    console.log("Is more than 200 attempts to find stone!");
                    return;
                }
            }
            console.log("Stone found");
            var iterations = RandomNumber(5, 120, seed_ * 2);
            var currX = block.Position.X;
            var currY = block.Position.Y;
            for (let index = 0; index < iterations; index++) {
                console.log(Matrix[currX][currY]);
                if(Matrix[currX][currY])
                Matrix[currX][currY] = null;
                console.log(`Block ${currX} ${currY} was removed`);
                var rand = RandomNumber(0,1, seed_ + index);
                if(rand < 0.25 && currX < Size - 1) currX++;
                else if(rand < 0.5 && currX > 0) currX--;
                else if(rand < 0.75 && currY > 0) currY--;
                else currY++;
            }
        }

        for (let index = 0; index < this.Size / 10; index++) {
            //console.log(this.Blocks);
            NewMine(this.Seed + index, this.Blocks, this.Matrix, this.Size);
        }

        //PLAYER
        this.Player = new Player(new Point(2, 12));
    }

    GetColumn(number){
        var list = [];
        var startIndex = Math.round(this.Blocks.length * (number / this.Size));
        var wasFoundBlock = false;
        for (let index = startIndex; index < this.Blocks.length; index++) {
            if(this.Blocks[index].Position.X != number && wasFoundBlock) {
                break;
            }
            else if(this.Blocks[index].Position.X != number && !wasFoundBlock) {
                continue;
            }
            list.push(this.Blocks[index]);
            wasFoundBlock = true;
        }
        wasFoundBlock = false;
        for (let index = startIndex - 1; index >= 0; index--) {
            if(this.Blocks[index].Position.X != number && wasFoundBlock) {
                break;
            }
            else if(this.Blocks[index].Position.X != number && !wasFoundBlock) {
                continue;
            }
            list.push(this.Blocks[index]);
            wasFoundBlock = true;
        }
        return list;
    }

    HighPlayerAboveGround(){
        var playerX = Math.round(this.Player.Position.X);
        var blocks = this.GetColumn(playerX);
        return this.Player.Position.Y - blocks.reduce((maxY, block) => block.Position.Y > maxY.Position.Y ? block : maxY, blocks[0]).Position.Y;
    }

    CanGoRight(){
        var playerX = Math.round(this.Player.Position.X);
        var blocks = this.GetColumn(playerX+1);
        if(playerX > this.Player.Position.X) return true;
        if(blocks.filter((block) => block.Position.Y < this.Player.Position.Y + 1 && block.Position.Y > this.Player.Position.Y - 1).length > 0){
            return false;
        }
        return true;
    }

    CanGoLeft(){
        var playerX = Math.round(this.Player.Position.X);
        var blocks = this.GetColumn(playerX-1);
        if(playerX < this.Player.Position.X) return true;
        if(blocks.filter((block) => block.Position.Y < this.Player.Position.Y + 1 && block.Position.Y > this.Player.Position.Y - 1).length > 0){
            return false;
        }
        return true;
    }

    PlayerIsOnGround() {
        return this.HighPlayerAboveGround() < 1.05;
    }
}

function RandomNumber(min, max, seed) {
    return ((Math.sin(seed * seed) + 1) / 2) * (max - min) + min;
}