import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})

export class ConsumerComponent implements OnInit, OnDestroy {

  p: number = 1
  consumers: any;
  subscribe: Subscription | undefined;
  pager: any = {
    currentPage: 1,
    totalPages: [],
  }

  city: any = localStorage.getItem('city')

  constructor(private service: MainService) { }

  ngOnInit(): void {

    this.subscribe = this.service.getServiceConsumer(this.city, 1).subscribe((data: any) => {
      for (let i = 1; i <= data.postPages; i++) {
        this.pager.totalPages.push(i)
     }
      this.consumers = data.result[0].posts
      
    })
  }

  paginateToNext(page: any) {

    this.subscribe = this.service.getServiceConsumer(this.city, page).subscribe((data: any) => {
      this.consumers = data.result[0].posts
      
    })
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }

}
