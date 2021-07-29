import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider';



const MaterialsComponent = [
  MatButtonModule,
  MatTabsModule,
  MatFormFieldModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatInputModule,
  MatIconModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatDialogModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialsComponent
  ],
  exports:[MaterialsComponent]
})
export class MaterialModule { }
