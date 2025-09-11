import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideZonelessChangeDetection(), provideHttpClient(), provideRouter(routes),
        importProvidersFrom(
          JwtModule.forRoot({
            config: {
              tokenGetter: () => sessionStorage.getItem('access_token')
            },
          })
        )
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
