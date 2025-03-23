import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  standalone: false,
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    await this.authService.handleCallback();
    this.router.navigate(['/home']);
  }
}
