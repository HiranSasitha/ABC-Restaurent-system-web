import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicCardVComponent } from './pic-card-v.component';

describe('PicCardVComponent', () => {
  let component: PicCardVComponent;
  let fixture: ComponentFixture<PicCardVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicCardVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicCardVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
