import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomFooter } from './bottom-footer';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BottomFooter', () => {
  let component: BottomFooter;
  let fixture: ComponentFixture<BottomFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomFooter],
      providers: [provideZonelessChangeDetection()]
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
