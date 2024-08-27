import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacteznousComponent } from './contacteznous.component';

describe('ContacteznousComponent', () => {
  let component: ContacteznousComponent;
  let fixture: ComponentFixture<ContacteznousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContacteznousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContacteznousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
