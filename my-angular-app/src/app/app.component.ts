import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: any = " ";
  constructor(private router: Router, private service: MainService) { }

  ngOnInit() {
    localStorage.getItem('token') ? this.router.navigate(['/', 'users-post']) : this.router.navigate(['/', 'home'])
  }


}
