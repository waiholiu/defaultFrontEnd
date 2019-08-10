import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PineappleListComponent } from './pineapple-list.component';

describe('PineappleListComponent', () => {
  let component: PineappleListComponent;
  let fixture: ComponentFixture<PineappleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PineappleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PineappleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
