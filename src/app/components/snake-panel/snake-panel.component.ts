import { Component, OnInit } from '@angular/core';
import { SnakeDataServiceService } from 'src/app/services/snake-data-service.service';

@Component({
  selector: 'snake-panel',
  templateUrl: './snake-panel.component.html',
  styleUrls: ['./snake-panel.component.less']
})
export class SnakePanelComponent implements OnInit {

  constructor(private snakeDataService: SnakeDataServiceService) { }

  started:boolean = false;
  end:boolean = false;
  paused: boolean = false;

  ngOnInit(): void {
  }

  startGame(){
    this.snakeDataService.setStartGame(true);
    this.started = true;
    this.end = false;
    this.paused = false;

    this.snakeDataService.getEndGame().subscribe(res=>{
      this.end = res;
      this.started = false;
    });

    this.snakeDataService.getPauseGame().subscribe(res=>{
      this.paused = res;
    });
  }
}
