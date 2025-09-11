import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContent } from './main-content';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MainContent', () => {
  let component: MainContent;
  let fixture: ComponentFixture<MainContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
