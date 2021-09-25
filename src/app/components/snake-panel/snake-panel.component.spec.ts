import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakePanelComponent } from './snake-panel.component';

describe('SnakePanelComponent', () => {
  let component: SnakePanelComponent;
  let fixture: ComponentFixture<SnakePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnakePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
