import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { map, mergeMap } from 'rxjs/operators'
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  background: ThemePalette = "primary"
  user: any;
  subscribe: Subscription | undefined;
  constructor(private activatedRoute: ActivatedRoute, private service: MainService) { }

  ngOnInit(): void {

    this.subscribe = this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      mergeMap((id) => this.service.getUser(id)
      )
    ).subscribe(data => {
      this.user = data
    })
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }

}
