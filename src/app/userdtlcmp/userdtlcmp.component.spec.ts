import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdtlcmpComponent } from './userdtlcmp.component';

describe('UserdtlcmpComponent', () => {
  let component: UserdtlcmpComponent;
  let fixture: ComponentFixture<UserdtlcmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdtlcmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdtlcmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
