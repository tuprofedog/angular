import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenu } from './top-menu';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TopMenu', () => {
  let component: TopMenu;
  let fixture: ComponentFixture<TopMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMenu],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
