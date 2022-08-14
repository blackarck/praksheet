import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegpasscmpComponent } from './regpasscmp.component';

describe('RegpasscmpComponent', () => {
  let component: RegpasscmpComponent;
  let fixture: ComponentFixture<RegpasscmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegpasscmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegpasscmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
