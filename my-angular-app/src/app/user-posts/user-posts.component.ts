import { Subscription } from 'rxjs';
import { MainService } from './../main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  
  show:boolean=true
  city = localStorage.getItem('city')
  background: ThemePalette = 'primary'
  subscribe: Subscription | undefined;
  user: any

  constructor(private router: Router, private service: MainService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('_id')
    this.subscribe = this.service.getUser(id).subscribe(data => {
      this.user = data
    })
  }

  showHide() {
    this.show = false
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/', 'home'])
  }

  goToProfile() {
    this.router.navigate(['/', 'my-profile'])
  }

  ngOnDestroy(){
    this.subscribe?.unsubscribe()
  }
}
