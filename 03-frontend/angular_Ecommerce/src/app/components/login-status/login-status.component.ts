import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})

export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';

  storage: Storage = sessionStorage;

  constructor(private oktaAuthSevice: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
   ){}

  ngOnInit(): void {
    // Subcribe to authentication state changes
    this.oktaAuthSevice.authState$.subscribe(
      (result) =>{
        this.isAuthenticated = result.isAuthenticated!,
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    // fetch the logged in user details (user's claims)
    this.oktaAuth.getUser().then(
      (res) =>{
        this.userFullName = res.name as string;

        // retrieve the user's email from authentication response
        const theEmail = res.email;
        this.storage.setItem('userEmail', JSON.stringify(theEmail));
      }
    )
  }

  logout(){
    // Terminates session with Okta and removes current tokens
    this.oktaAuth.signOut();
  }

   
}
