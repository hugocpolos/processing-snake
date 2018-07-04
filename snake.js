const RIGHT = 0;
const UP 	= 1;
const LEFT 	= 2;
const DOWN 	= 3;
div = 20;

class Snake{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.direction = RIGHT;
		this.speed = 1;
		this.body = [];
		this.canMove = true;
	}
	display(){
		fill(48,200,0);
		rect(this.x, this.y, div, div);
		let i = 0;
		fill("#74d074");
		for(i = 0; i < this.body.length; i++){
			rect(this.body[i][0], this.body[i][1],div,div);
		}
	}

	update_body(){
		let i = this.body.length - 1;
		for(i = this.body.length - 1; i >= 0; i--){
			if( i == 0){
				this.body[i] = [this.x , this.y];
			}
			else{
				this.body[i] = this.body[i-1];
			}
		}
	}

	move(){
		this.update_body();
		if(this.direction == RIGHT){
			this.x += this.speed * div;

		}else if(this.direction == UP){
			this.y -= this.speed * div;
			
		}else if(this.direction == LEFT){
			this.x -= this.speed * div;
			
		}else if(this.direction == DOWN){
			this.y += this.speed * div;
		}
		snake.canMove = true;
	}

	touchEdge(){
		return ((this.x > width - div) || (this.x < 0) || (this.y > height - div) || (this.y < 0));
	}

	eat(food){
		return (dist(this.x, this.y, food.x, food.y) < 10);  
	}

	grow(){
		this.new_body = createVector(this.x,this.y);
		this.body.push(this.new_body);
	}

	die(){
		let i;
		for (i = 1; i < this.body.length; i++){
			if(dist(this.x, this.y, this.body[i][0], this.body[i][1]) < 10){
				return true;
			}
		}
		return false;
	}	
}