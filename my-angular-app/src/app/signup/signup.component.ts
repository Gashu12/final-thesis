import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {

  hide: boolean = true
  signupForm: FormGroup;
  subscribe: Subscription | undefined;
  passwordStrength: { msg: string; } | any
  constructor(private formBuilder: FormBuilder, private service: MainService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      "firstName": ['', Validators.required],
      "lastName": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required, this.passwordValidator]],
      "state": ['', Validators.required],
      "city": ['', Validators.required],
      "zipcode": ['', Validators.required],
      "phone": ['', Validators.required],
    })
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} | null {
    const value = control.value
    console.log(value.length)
    
    if(value && value.length < 8){
      this.passwordStrength.msg = 'weak'
      console.log(this.passwordStrength)
    }
    if(value.length > 8 && value.length < 12){
   
      this.passwordStrength.msg = 'medium'
      console.log(this.passwordStrength)
    }

    if(value.length < 6){
      return {password: true}
    }
    setTimeout(() => this.passwordStrength.msg = 'strong', 0)
    return null

  }

  onSignup() {

    if (this.signupForm.valid) {
      this.subscribe = this.service.signup(this.signupForm.value).subscribe((response) => {
        if (response.status == "success") {
          this.router.navigate(['/', 'home'])
        }
      })
    }
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }


}
