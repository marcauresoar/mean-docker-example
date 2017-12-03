import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessoriesComponent } from './accessories.component';
import { AccessoriesFormComponent } from './accessories-form/accessories-form.component';
import { AccessoriesInfoComponent } from './accessories-info/accessories-info.component';
import { AccessoriesListComponent } from './accessories-list/accessories-list.component';
import { AccessoriesListItemComponent } from './accessories-list/accessories-list-item/accessories-list-item.component';

@NgModule({
  declarations: [
    AccessoriesComponent,
    AccessoriesFormComponent,
    AccessoriesInfoComponent,
    AccessoriesListComponent,
    AccessoriesListItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccessoriesModule {}
