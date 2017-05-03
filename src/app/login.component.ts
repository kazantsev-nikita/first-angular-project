import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cat } from './cat';
import { AuthenticationService } from './login.service';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    
  model: any = {};
  loading = false;
  error = '';
    
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }
    
    ngOnInit(): void { }
    
    login() {
        this.loading = true;        
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
              if (result === false) {
                this.error = 'Username or password is incorrect';
                this.loading = false;
              }
            });
    }
}