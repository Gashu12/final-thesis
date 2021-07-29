import { ProfilePhotoComponent } from './../profile-photo/profile-photo.component';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { ThemePalette } from '@angular/material/core';
import { Subscription, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-my-prifile',
  templateUrl: './my-prifile.component.html',
  styleUrls: ['./my-prifile.component.css']
})
export class MyPrifileComponent implements OnInit, OnDestroy {

  user: any
  background: ThemePalette = 'primary'
  subscribe: Subscription | undefined;
  selectedFiles: FileList | any;
  allImages: Array<string> = []
  myImage: string | any
  message: string | undefined
  imgURL: string | any
  selectedImgURL: string | any
  showHide: boolean = true
  choseImage: boolean = false
  listButton: boolean = false
  changeImage: boolean = false
  currentProfile: string = "https://s3.amazonaws.com/finalpro.com/raw-images/6d5d3c9e76622463ffab0e23cd9b972a"
  baseUrl = 'https://s3.amazonaws.com/finalpro.com/'
  dialogTrigger: boolean = false
  changedProfile: string = ''
  constructor(private router: Router,
    private service: MainService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    
   this.activatedRoute.queryParams.subscribe(params => {
     if(params){
      this.changedProfile = params['fileName']
      this.changeImage = true
    
     }else {
       this.changedProfile = this.currentProfile
     }
      
    })
    const id = localStorage.getItem('_id')
    this.subscribe = this.service.getUser(id).subscribe((data: any) => {
      console.log(data)
      this.user = data
    })
  }
  goToPost() {
    this.router.navigate(['/', 'add-post', this.user.result._id])
  }
  goToUpdate() {
    this.router.navigate(['/', 'update-address', this.user.result._id], { state: { data: this.user.result.address } })
  }

  addImage(){
    this.choseImage = true
    this.listButton = !this.listButton
  }


  upload() {

    const formData = new FormData()
    formData.append('image', this.selectedFiles, this.selectedFiles.name)
    console.log(formData)
    this.service.uploadImage(formData).subscribe((data: any) => {
      console.log(data)
      this.selectedImgURL = ''
      this.selectedFiles = ''
      this.message = 'successfully uploaded!'
    })


  }

  cancelUpload(){
    this.selectedImgURL = ''
    this.choseImage = false
  }

  listAllImages() {

    this.choseImage = false
    this.listButton = this.listButton
   return this.service.getAllImages().subscribe((data: any) => {

      const imageArr = data.result

      if (imageArr) {
        for (let image of imageArr) {
          if (image.Size !== 0) {

            this.imgURL = this.baseUrl + image.Key
            this.allImages.push(this.imgURL)
            
          }
        }
        
      }
      console.log(this.allImages)
    })
  }

  selectFile(event: any) {

    const image = event.target.files[0]

    if (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
      if (image.size <= 1024000) {

        this.selectedFiles = event.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(this.selectedFiles)
        reader.onload = (_event) => {
          this.selectedImgURL = reader.result
        }
      } else {
        this.message = 'please select an image up to 1MB!'
      }
    } else {
      this.message = 'You are allowed to upload jpeg, jpg, or png image type only'
    }
    console.log(this.selectedFiles)
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }

}