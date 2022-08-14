import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoptdlgComponent } from './registoptdlg.component';

describe('RegistoptdlgComponent', () => {
  let component: RegistoptdlgComponent;
  let fixture: ComponentFixture<RegistoptdlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistoptdlgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistoptdlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
