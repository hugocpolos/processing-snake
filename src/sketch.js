w = 600;
h = 400; //altura e largura do campo.
gameover = false;
start_screen = true;
start_screen_count = 0;
difficulty = 5;

function setup() {
	print
 	createCanvas(w,h);
 	snake = new Snake(0, 0);
 	for (let z = 0; z < 2; z++){
 		snake.grow();
 	}
 	snake_startscreen = [];
 	frameRate(5 + 2*difficulty);
 	food = new Food();
 	points = 0;
}

function draw() {
	if(start_screen){
		background(0);
		for(let i = 0; i < snake_startscreen.length; i++){
			snake_startscreen[i].move();
			snake_startscreen[i].display();

			if(snake_startscreen[i].touchEdge()){
				snake_startscreen.splice(i,1);
			}
		}

		start_screen_count++;
		//console.log(start_screen_count);
		if(start_screen_count % 4 == 0){
			for(let i = 0; i < snake_startscreen.length; i++){
				snake_startscreen[i].direction = floor(random(4));
			}
		}

		if(start_screen_count == 15){
			new_snake = new Snake(floor(random(600)), floor(random(400)));
			new_snake.direction = floor(random(4));
			for(let j = 3+floor(random(5)); j > 0; j--){
				new_snake.grow();
			}
			snake_startscreen.push(new_snake);
			start_screen_count = 0;
		}

		
		fill(255);
		text("SNAKE", (w/2) - 50, h/3);
		text("Press Space Bar to start!", (w/2) - 80, 2*h/3);
		text("difficulty: "+ difficulty + "  press UP and DOWN to adjust!", (w/2) - 120, 4*h/5);


	}else{
		snake_startscreen = [];
		if(!gameover){
			background(50);
			snake.move();
			snake.display();
			food.display();

			if(snake.eat(food)){
				points += (0.8 * difficulty);
				snake.grow();
				food = new Food();
				while(food.inside(snake) == true){
					food = new Food();
				}
			}

			if(snake.touchEdge() || snake.die()){
				gameover = true
				run_score = floor(points);
				setup();
			}
		}else{
			background(0);
			fill(255);
			text("Score: " + run_score, (w/2) - 40, h/2 - h/4)
			text("Game Over!", (w/2) - 50, 2*h/3);
			text("difficulty: "+ difficulty + "  press UP and DOWN to adjust!", (w/2) - 120, 4*h/5);
			score = 0;
		}
	}
	

}

function keyPressed(){
	if(keyCode == 32 && start_screen){
		start_screen = false;
		frameRate(5 + 2*difficulty);
	}else
	if(keyCode == 32){
		gameover = false;
	}else
	if(keyCode == UP_ARROW && (start_screen || gameover)){
		difficulty ++;
		if(difficulty > 20){
			difficulty = 20;
		}
		frameRate(5 + 2*difficulty);
	}
	if(keyCode == DOWN_ARROW && (start_screen || gameover)){
		difficulty --;
		if(difficulty < 1){
			difficulty = 1;
		}
		frameRate(5 + 2*difficulty);
	}
	if(snake.canMove){

		if(keyCode == RIGHT_ARROW && snake.direction != LEFT){
	    snake.direction = RIGHT;
	    snake.canMove = false;
		}
		if(keyCode == LEFT_ARROW && snake.direction != RIGHT){
	    snake.direction = LEFT;
	    snake.canMove = false;
		}
		if(keyCode == UP_ARROW && snake.direction != DOWN){
	    snake.direction = UP;
	    snake.canMove = false;
		}
		if(keyCode == DOWN_ARROW && snake.direction != UP){
	    snake.direction = DOWN;
	    snake.canMove = false;
		}

	}
}