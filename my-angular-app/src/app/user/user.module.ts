import { ProfilePhotoComponent } from './../profile-photo/profile-photo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProviderComponent } from '../provider/provider.component';
import { ConsumerComponent } from '../consumer/consumer.component';
import { ProfileComponent } from '../profile/profile.component';
import { MyPrifileComponent } from '../my-prifile/my-prifile.component';
import { UpdateaddressComponent } from '../updateaddress/updateaddress.component';
import { PostComponent } from '../post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPostsComponent } from '../user-posts/user-posts.component';
import { MaterialModule } from '../material/material.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'w-ng5';




@NgModule({
  declarations: [
    ProviderComponent,
    ConsumerComponent,
    PostComponent,
    UpdateaddressComponent,
    ProfileComponent,
    MyPrifileComponent,
    UserPostsComponent,
    ProfilePhotoComponent,
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule,

    RouterModule.forChild([
      {
        path: "users-post", component: UserPostsComponent,
        children: [
          { path: "service-provider/:city", component: ProviderComponent },
          { path: "service-consumer/:city", component: ConsumerComponent }
        ]
      },

      { path: "user-profile/:id", component: ProfileComponent },
      { path: "user-post-detail/:id/post/:postId", component: PostDetailsComponent },
      { path: "my-profile", component: MyPrifileComponent },
      { path: "profile-photo", component: ProfilePhotoComponent},
      { path: "update-address/:id", component: UpdateaddressComponent },
      { path: "add-post/:id", component: PostComponent },
      { path: '**', redirectTo: 'home' }
    ]),
    MaterialModule
  ],

})
export class UserModule { }
