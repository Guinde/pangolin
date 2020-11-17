import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPangolinsComponent } from './list-pangolins.component';

describe('ListPangolinsComponent', () => {
  let component: ListPangolinsComponent;
  let fixture: ComponentFixture<ListPangolinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPangolinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPangolinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
