import { map, mergeMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from './../main.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent implements OnInit {
  subscribe: Subscription | Observable<Blob> | undefined
  selectedImage: string = ''
  myImage: string | any
  message: string = ''
  @Input() changedURL = ''
  @Output() choseImage = new EventEmitter<string>()
  constructor(private service: MainService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.selectedImage = params['fileName']
      }
    )
  }

  downloadImage() {
    window.open(this.selectedImage)
  }

  changeProfilePic(){
    this.router.navigate(['/', 'my-profile'], {queryParams: {fileName: this.selectedImage}})
  }

  deleteThisImage() {
    const key = this.selectedImage
    const str = '.jpeg'
    console.log(key)
    if (key.includes(str)) {
      this.service.deleteImage(key.slice(55)).subscribe()
      this.message = 'successfully deleted!'
      this.selectedImage = ''
    } else {
      this.service.deleteImage(key.slice(49)).subscribe()
      this.message = 'successfully deleted!'
      this.selectedImage = ''
    }
  }

}
