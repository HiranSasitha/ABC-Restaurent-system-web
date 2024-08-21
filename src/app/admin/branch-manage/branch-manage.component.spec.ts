import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManageComponent } from './branch-manage.component';

describe('BranchManageComponent', () => {
  let component: BranchManageComponent;
  let fixture: ComponentFixture<BranchManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
