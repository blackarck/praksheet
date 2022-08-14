import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggmaincmpComponent } from './suggmaincmp.component';

describe('SuggmaincmpComponent', () => {
  let component: SuggmaincmpComponent;
  let fixture: ComponentFixture<SuggmaincmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggmaincmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggmaincmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
