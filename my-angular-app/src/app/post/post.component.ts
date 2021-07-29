import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { map, mergeMap } from 'rxjs/operators'
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnDestroy {

  background: ThemePalette = "primary"
  services: string[] = ["provider", "consumer"]
  addpostForm: FormGroup;
  subscribe: Subscription|undefined;

  constructor(private formBuilder: FormBuilder, private service: MainService,
    private router: Router, private route: ActivatedRoute) {

    this.addpostForm = this.formBuilder.group({
      "post": ['', Validators.required],
      "service": ['', Validators.required]
    })
  }

  addPost() {

    if (this.addpostForm.valid) {
     this.subscribe =  this.route.paramMap.pipe(
        map(params => params.get('id')),
        mergeMap((id) => this.service.addPost(id, this.addpostForm.value)
        )
      ).subscribe((response) => {
        if (response.status == "success") {
          this.router.navigate(['/', 'users-post'])
        }
      })
    }
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }
}
