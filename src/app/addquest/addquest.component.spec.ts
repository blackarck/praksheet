import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquestComponent } from './addquest.component';

describe('AddquestComponent', () => {
  let component: AddquestComponent;
  let fixture: ComponentFixture<AddquestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddquestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
