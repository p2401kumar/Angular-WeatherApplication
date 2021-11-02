import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyAreaComponent } from './weekly-area.component';

describe('WeeklyAreaComponent', () => {
  let component: WeeklyAreaComponent;
  let fixture: ComponentFixture<WeeklyAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
