import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from './../main.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  background: ThemePalette = "primary"
  postDetail: any
  commentForm: FormGroup
  id: string | null = ""
  postId: string | null = ""
  postMsg: any
  dateDiff: number = 0
  subscribe: Subscription | undefined;

  constructor(private service: MainService, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router) {
    
    this.commentForm = formBuilder.group({
      'comment': ['', Validators.required]
    })
    this.postMsg = this.router.getCurrentNavigation()?.extras.state
  }

  ngOnInit(): void {

    this.subscribe = this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')
      console.log(typeof params.get('id'))
      this.postId = params.get('postId')
      this.service.getComments(this.id, this.postId).subscribe((data) => {
        this.postDetail = data.result[0].posts.comments

      })
    })
  }

  onCommentSubmit() {
    if (this.commentForm.valid) {
      this.service.addComent(this.id, this.postId, this.commentForm.value).subscribe(
        (res) => {
          if (res.status == 'success') {
            this.service.getComments(this.id, this.postId).subscribe((data) => {
              this.postDetail = data.result[0].posts.comments
            })
          }
        }
      )
    }
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }
}
