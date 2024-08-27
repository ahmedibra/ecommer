import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoComponent } from './perso.component';

describe('PersoComponent', () => {
  let component: PersoComponent;
  let fixture: ComponentFixture<PersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
