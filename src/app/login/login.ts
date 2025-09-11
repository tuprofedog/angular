import { Component, inject, Inject, PLATFORM_ID, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  hide = signal(true);
  emailMessage = signal('');
  passwordMessage = signal('');
  private isBrowser: boolean;
  
  private _snackBar = inject(MatSnackBar);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    merge(this.form.controls.email.statusChanges, this.form.controls.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    merge(this.form.controls.password.statusChanges, this.form.controls.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault();
    event.stopPropagation();
  }

  onSubmit() {
    if (!this.isBrowser) return;

    if (this.form.valid) {
      sessionStorage.setItem('user_id', 'fake-user-id');
      sessionStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30');
      this.router.navigate(['/home']);
    } else {
      this.updateErrorMessage();
      this.form.markAllAsTouched();
      this.openSnackBar('Form is invalid');
    }
  }
  
  updateErrorMessage() {
    const email = this.form.controls.email
    const password = this.form.controls.password

    if (email.hasError('required')) {
      this.emailMessage.set('You must enter an email');
    } else if (email.hasError('email')) {
      this.emailMessage.set('Not a valid email');
    } else {
      this.emailMessage.set('');
    }

    if (password.hasError('required')) {
      this.passwordMessage.set('You must enter a password');
    } else if (password.hasError('minlength')) {
      this.passwordMessage.set('Minimun 6 characters');
    } else {
      this.passwordMessage.set('');
    }
  }
}
