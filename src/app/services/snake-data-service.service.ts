import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnakeDataServiceService {

  constructor() { }

  private startGame: EventEmitter<boolean> = new EventEmitter();
  private endGame: EventEmitter<boolean> = new EventEmitter();
  private pauseGame: EventEmitter<boolean> = new EventEmitter();

  setStartGame(startGame: boolean){
    this.startGame.emit(startGame);
  }
  
  getStartGame(){
    return this.startGame;
  }

  setEndGame(endGame: boolean){
    this.endGame.emit(endGame);
  }

  getEndGame(){
    return this.endGame;
  }

  setPauseGame(pauseGame: boolean){
    this.pauseGame.emit(pauseGame);
  }

  getPauseGame(){
    return this.pauseGame;
  }
}
