import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit, OnDestroy {

  p: number = 1
  providers: any
  subscribe: Subscription | undefined;
  city: string | null = localStorage.getItem('city')
  pager: any = {
    currentPage: 1,
    totalPages: [],
  }

  constructor(private service: MainService) { }

  ngOnInit(): void {

    const skip: number = 5
    this.subscribe = this.service.getServiceProvider(this.city).subscribe((data: any) => {
      console.log(data.result[0].posts)
      for (let i = 1; i <= data.postPages; i++) {
        this.pager.totalPages.push(i)
     }
      this.providers = data.result[0].posts
    })
  }

  paginateToNext(page: any) {

    this.subscribe = this.service.getServiceConsumer(this.city, page).subscribe((data: any) => {
      console.log(data)
      this.providers = data.result[0].posts
      console.log(this.providers)
     
    })
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }

}
