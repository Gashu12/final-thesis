import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './token-interceptor';
import { MaterialModule } from './material/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PostDetailsComponent } from './post-details/post-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'w-ng5';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PostDetailsComponent,
    
  ],
  imports: [
   
    BrowserModule,
    NgxPaginationModule,
    PipesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "home", component: HomeComponent,
        children: [
          { path: "", component: LoginComponent },
          { path: "signup", component: SignupComponent }
        ]
      },
     
      {path:"", loadChildren:()=>import('./user/user.module').then(module=>module.UserModule)}
    ], {preloadingStrategy: PreloadAllModules}),
    MaterialModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
