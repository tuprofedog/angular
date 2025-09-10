import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private _authService: AuthService) {}

  protected closeSession() {
    this._authService.closeSession();
  }
}
