import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPangolinComponent } from './form-pangolin.component';

describe('FormPangolinComponent', () => {
  let component: FormPangolinComponent;
  let fixture: ComponentFixture<FormPangolinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPangolinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPangolinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
