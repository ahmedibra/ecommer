import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownFooterComponent } from './down-footer.component';

describe('DownFooterComponent', () => {
  let component: DownFooterComponent;
  let fixture: ComponentFixture<DownFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
