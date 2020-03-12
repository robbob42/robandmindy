import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobsidenavComponent } from './robsidenav.component';

describe('RobsidenavComponent', () => {
  let component: RobsidenavComponent;
  let fixture: ComponentFixture<RobsidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobsidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
