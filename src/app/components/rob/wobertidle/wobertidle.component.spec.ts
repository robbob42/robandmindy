import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WobertidleComponent } from './wobertidle.component';

describe('WobertidleComponent', () => {
  let component: WobertidleComponent;
  let fixture: ComponentFixture<WobertidleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WobertidleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WobertidleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
