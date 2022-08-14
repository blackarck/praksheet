import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincmpComponent } from './logincmp.component';

describe('LogincmpComponent', () => {
  let component: LogincmpComponent;
  let fixture: ComponentFixture<LogincmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogincmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogincmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
