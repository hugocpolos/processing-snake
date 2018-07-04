pick_x = function(){
		col = floor(width/div);
		return floor(random(col)) * div;
}
pick_y =function(){
		row = floor(height/div);
		return floor(random(row)) * div;
}

class Food{
	constructor(){
		this.x = pick_x();
		this.y = pick_y();
	}
	
	display(){
		fill(255,128,64);
		rect(this.x, this.y, div, div);
	}

	inside(snake){
		//console.log("Cabeca x: " + snake.x + " Cabeca y: "+ snake.y);
		//console.log("food x: " + this.x + " food y: "+ this.y);
		//console.log("tamanho da cauda: " + snake.body.length);
		//console.log("============ CAUDA =============");
		//console.log("food x: " + this.x + " food y: "+ this.y);
		if(dist(this.x, this.y, snake.x, snake.y) < div){
				//console.log("dentro");
				return true;
			}

		for(let i = 0; i < snake.body.length - 1; i++){
			//console.log(">   cauda " + i + ": " + snake.body[i]);
			if(dist(this.x, this.y, snake.body[i][0], snake.body[i][1]) < div){
				//console.log("dentro");
				return true;
			}
		}

		return false;
	}
}