import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemByBranchComponent } from './item-by-branch.component';

describe('ItemByBranchComponent', () => {
  let component: ItemByBranchComponent;
  let fixture: ComponentFixture<ItemByBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemByBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemByBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
