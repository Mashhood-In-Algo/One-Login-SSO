import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'https://mashhood-zaidi.onelogin.com/oidc/2', 
    clientId: '3fec0af0-e875-013d-caf6-07cee074fc1b246756',
    redirectUri: 'http://localhost:4200/auth/callback',
    responseType: 'code',
    scope: 'openid profile email', 
    dummyClientSecret: '08d8d372f79e108307071e0ed7e6f5c5912a21be5b53b001b4f6ab7848397334',
    postLogoutRedirectUri: 'http://localhost:4200/login',


    // Explicitly set the endpoints:
    loginUrl: 'https://mashhood-zaidi.onelogin.com/oidc/2/auth',
    tokenEndpoint: 'https://mashhood-zaidi.onelogin.com/oidc/2/token',
    userinfoEndpoint: 'https://mashhood-zaidi.onelogin.com/oidc/2/me',

    // If you do not want to rely on discovery doc:
    strictDiscoveryDocumentValidation: false

  };

  private configure() {
    console.log("properties configured: ", this.authConfig);
    this.oauthService.configure(this.authConfig);
    this.oauthService.tryLoginCodeFlow().then(() => {
      console.log('Tried login code flow');
    });
  }

  public async login() {
    this.oauthService.initLoginFlow();
  }

  public async handleCallback(): Promise<void> {
    await this.oauthService.tryLoginCodeFlow();
  }

  public get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  public get idToken(): string {
    return this.oauthService.getIdToken();
  }

  public get identityClaims(): any {
    return this.oauthService.getIdentityClaims();
  }

  public logout() {
    this.oauthService.logOut();
  }
}
