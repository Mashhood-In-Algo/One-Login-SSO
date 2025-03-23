import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  claims: any;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.claims = this.authService.identityClaims;
    console.log("Here are the claims : ", this.claims);
  }

  logout() {
    this.authService.logout();
  }

}
