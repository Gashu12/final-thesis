import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';

import { map, mergeMap } from 'rxjs/operators'
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-updateaddress',
  templateUrl: './updateaddress.component.html',
  styleUrls: ['./updateaddress.component.css']
})
export class UpdateaddressComponent implements OnDestroy {

  background: ThemePalette = "primary"
  user: object | any;
  updateForm: FormGroup;
  subscribe: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private service: MainService,
    private router: Router, private route: ActivatedRoute) {

    this.user = this.router.getCurrentNavigation()?.extras.state
    this.updateForm = this.formBuilder.group({
      "state": [this.user.data.state, Validators.required],
      "city": [this.user.data.city, Validators.required],
      "zipcode": [this.user.data.zipcode, Validators.required],
    })
  }


  onUpdate() {

    if (this.updateForm.valid) {
      this.subscribe = this.route.paramMap.pipe(
        map(params => params.get('id')),
        mergeMap((id: any) => this.service.updateAddress(id, this.updateForm.value)
        )
      ).subscribe((response: any) => {
        if (response.status == "success") {
          localStorage.setItem('city', this.updateForm.value.city)
          this.router.navigate(['/', 'my-profile'])
        }
      })
    }
  }
  
  ngOnDestroy() {
  this.subscribe?.unsubscribe()
}

}
