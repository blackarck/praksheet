import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsheetComponent } from './qsheet.component';

describe('QsheetComponent', () => {
  let component: QsheetComponent;
  let fixture: ComponentFixture<QsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
