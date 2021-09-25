import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnakeGridComponent } from './components/snake-grid/snake-grid.component';
import { SnakePanelComponent } from './components/snake-panel/snake-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeGridComponent,
    SnakePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
