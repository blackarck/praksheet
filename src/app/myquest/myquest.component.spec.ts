import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestComponent } from './myquest.component';

describe('MyquestComponent', () => {
  let component: MyquestComponent;
  let fixture: ComponentFixture<MyquestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyquestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
