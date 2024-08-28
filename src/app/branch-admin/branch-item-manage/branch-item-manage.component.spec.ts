import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchItemManageComponent } from './branch-item-manage.component';

describe('BranchItemManageComponent', () => {
  let component: BranchItemManageComponent;
  let fixture: ComponentFixture<BranchItemManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchItemManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchItemManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
