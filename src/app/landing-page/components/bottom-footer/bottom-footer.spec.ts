import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomFooter } from './bottom-footer';

describe('BottomFooter', () => {
  let component: BottomFooter;
  let fixture: ComponentFixture<BottomFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
