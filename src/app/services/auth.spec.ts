import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth';
import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(),
        importProvidersFrom(
          JwtModule.forRoot({
            config: {
              tokenGetter: () => sessionStorage.getItem('access_token')
            },
          })
        )
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
