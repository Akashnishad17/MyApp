import { Component, OnInit, HostListener } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Cordinate } from 'src/app/models/cordinate';
import { SnakeDataServiceService } from 'src/app/services/snake-data-service.service';

@Component({
  selector: 'snake-grid',
  templateUrl: './snake-grid.component.html',
  styleUrls: ['./snake-grid.component.less']
})
export class SnakeGridComponent implements OnInit {
  row = 50;
  col = 100;
  grid: boolean[][] | undefined;
  snake: Cordinate[] = [];
  direction = "right";
  food: Cordinate | undefined;
  subscription: Subscription | undefined; 
  paused = false;
  gameOver = false;
  score: number = 0;

  constructor(private snakeDataService: SnakeDataServiceService) {
    this.reloadGrid();
  }

  reloadGrid(){
    this.grid = [];
    for(var i = 0; i < this.row; i++){
      this.grid[i] = [];
      for(var j = 0; j < this.col; j++){
        this.grid[i][j] = false;
      }
    }
  }

  ngOnInit(): void {
    this.snakeDataService.getStartGame().subscribe(res=>{
      if(res){
        this.score = 0;
        this.paused = false;
        this.gameOver = false;
        this.direction = "right";
        this.reloadGrid();
        this.subscription?.unsubscribe();
        this.startGame();
      }
    });
  }

  startGame(){
    this.snake = [];
    this.snake.push(new Cordinate(20, 30));
    this.snake.push(new Cordinate(20, 29));
    this.snake.push(new Cordinate(20, 28));
    this.snake.push(new Cordinate(20, 27));
    this.snake.push(new Cordinate(20, 26));

    this.snake.forEach((element: Cordinate)=>{
      if(this.grid && element.x != undefined && element.y != undefined){
        this.grid[element.x][element.y] = true;
      }
    });

    this.generateFood();
    this.continueGame();
  }

  continueGame(){
    var source = interval(150);
    this.subscription = source.subscribe(res => {    
      if(this.direction == "left")
        this.arrowLeftEvent(true);
      
      if(this.direction == "right")
        this.arrowRightEvent(true);

      if(this.direction == "up")
        this.arrowUpEvent(true);

      if(this.direction == "down")
        this.arrowDownEvent(true);
    });
  }

  popLastElement(){
    var cor: Cordinate | undefined = this.snake.pop();
    if(this.grid && cor && cor.x != undefined && cor.y != undefined && !this.cordinatePresent(cor.x, cor.y))
      this.grid[cor.x][cor.y] = false;
  }

  generateFood(){
    var x = this.randomNumber(0, this.row-1);
    var y = this.randomNumber(0, this.col-1);

    if(this.cordinatePresent(x, y))
    {
      this.generateFood();
    }
    else{
      this.food = new Cordinate(x, y);
    }
  }

  randomNumber(min: number, max: number){
    return Math.floor(Math.random() * (max - min) + min);
  }

  cordinatePresent(x: number, y: number){
    var present = false;
    this.snake.forEach(element =>{
      if(element.x != undefined && element.y != undefined && x == element.x && y == element.y)
        present = true;
    });
    return present;
  }

  incrementScore(){
    this.score = this.score + 1;
  }

  endGame(){
    this.gameOver = true;
    this.paused = true;
    this.snakeDataService.setEndGame(this.gameOver);
  }

  @HostListener('window:keyup.ArrowUp') 
  arrowUpEvent(keyNotPressed: boolean = false){
    if(this.paused)
      return;
    if(this.snake && this.grid && (keyNotPressed || (this.direction != "up" && this.direction != "down"))){
      var x = this.snake[0].x;
      var y = this.snake[0].y;
      if(x != undefined && y != undefined && x - 1 >= 0)
      {
        if(keyNotPressed)
        {
          if(this.cordinatePresent(x-1, y))
            this.endGame();
          this.snake.splice(0, 0, new Cordinate(x - 1, y));
          this.grid[x-1][y] = true;
          if(this.food && this.food.x != undefined && this.food.y != undefined && !(this.food.x == x - 1 && this.food.y == y))
          {
            this.popLastElement();
          }else{
            this.generateFood();
            this.incrementScore();
          }
        }
        this.direction = "up";
      }else{
        this.endGame();
      }
    }
  }

  @HostListener('window:keyup.ArrowDown') 
  arrowDownEvent(keyNotPressed: boolean = false){
    if(this.paused)
      return;
    if(this.snake && this.grid && (keyNotPressed || (this.direction != "up" && this.direction != "down"))){
      var x = this.snake[0].x;
      var y = this.snake[0].y;
      if(x != undefined && y != undefined && x + 1 < this.row)
      {
        if(keyNotPressed)
        {
          if(this.cordinatePresent(x+1, y))
            this.endGame();
          this.snake.splice(0, 0, new Cordinate(x + 1, y));
          this.grid[x+1][y] = true;
          if(this.food && this.food.x != undefined && this.food.y != undefined && !(this.food.x == x + 1 && this.food.y == y))
          {
            this.popLastElement();
          }else{
            this.generateFood();
            this.incrementScore();
          }
        }
        this.direction = "down";
      }else{
        this.endGame();
      }
    }
  }

  @HostListener('window:keyup.ArrowLeft') 
  arrowLeftEvent(keyNotPressed: boolean = false){
    if(this.paused)
      return;
    if(this.snake && this.grid && (keyNotPressed || (this.direction != "left" && this.direction != "right"))){
      var x = this.snake[0].x;
      var y = this.snake[0].y;
      if(x != undefined && y != undefined && y - 1 >= 0)
      {
        if(keyNotPressed)
        {
          if(this.cordinatePresent(x, y - 1))
            this.endGame();
          this.snake.splice(0, 0, new Cordinate(x, y - 1));
          this.grid[x][y-1] = true;
          if(this.food && this.food.x != undefined && this.food.y != undefined && !(this.food.x == x && this.food.y == y - 1))
          {
            this.popLastElement();
          }else{
            this.generateFood();
            this.incrementScore();
          }
        }
        this.direction = "left";
      }else{
        this.endGame();
      }
    }
  }

  @HostListener('window:keyup.ArrowRight') 
  arrowRightEvent(keyNotPressed: boolean = false){
    if(this.paused)
      return;
    if(this.snake && this.grid && (keyNotPressed || (this.direction != "left" && this.direction != "right"))){
      var x = this.snake[0].x;
      var y = this.snake[0].y;
      if(x != undefined && y != undefined && y + 1 < this.col)
      {
        if(keyNotPressed)
        {
          if(this.cordinatePresent(x, y + 1))
            this.endGame();
          this.snake.splice(0, 0, new Cordinate(x, y + 1));
          this.grid[x][y+1] = true;
          if(this.food && this.food.x != undefined && this.food.y != undefined && !(this.food.x == x && this.food.y == y + 1))
          {
            this.popLastElement();
          }else{
            this.generateFood();
            this.incrementScore();
          }
        }
        this.direction = "right";
      }else{
        this.endGame();
      }
    }
  }

  @HostListener('window:keyup.space')
  spaceBarEvent(){
    if(this.gameOver)
      return;

    if(this.paused)
    {
      this.continueGame();
      this.paused = false;
    }
    else
    {
      this.subscription?.unsubscribe();
      this.paused = true;
    }

    this.snakeDataService.setPauseGame(this.paused);
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }
}
