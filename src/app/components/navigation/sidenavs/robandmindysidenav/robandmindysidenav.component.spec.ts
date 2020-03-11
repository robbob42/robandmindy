import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobandmindysidenavComponent } from './robandmindysidenav.component';

describe('OlsenssidenavComponent', () => {
  let component: RobandmindysidenavComponent;
  let fixture: ComponentFixture<RobandmindysidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobandmindysidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobandmindysidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
