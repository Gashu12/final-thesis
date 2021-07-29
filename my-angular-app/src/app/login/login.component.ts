import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy  {

  hide:boolean=true
  loginForm: FormGroup;
  notification: string = ""
  subscribe: Subscription|undefined;

  constructor(private formBuilder: FormBuilder, private service: MainService, private router: Router) {
    
    this.loginForm = this.formBuilder.group({
      "email": ['', [Validators.required, Validators.email]],
      "password":['',Validators.required]
    })
   }

  onLogin() {

    if (this.loginForm.valid) {
     this.subscribe =  this.service.login(this.loginForm.value).subscribe((response) => {
        if (response.status == "success") {
          localStorage.setItem('token', response.token);
          localStorage.setItem('_id', response._id);
          localStorage.setItem('city', response.city);
          this.router.navigate(['/', 'users-post']) 
        } else {
          this.notification="wrong email or password"
      }
    })
    }
  }
  
  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }
}
