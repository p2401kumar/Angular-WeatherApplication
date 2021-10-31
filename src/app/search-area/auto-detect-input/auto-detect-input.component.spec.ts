import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDetectInputComponent } from './auto-detect-input.component';

describe('AutoDetectInputComponent', () => {
  let component: AutoDetectInputComponent;
  let fixture: ComponentFixture<AutoDetectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDetectInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDetectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
