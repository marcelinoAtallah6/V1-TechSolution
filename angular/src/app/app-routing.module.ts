import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreItemsComponent } from './store-items/store-items.component';
import { SystemComponent } from './system/system.component';
const routes: Routes = [
  { path: '',  redirectTo: 'storeItems' , pathMatch: 'full'},
  {path:'storeItems' ,component: StoreItemsComponent},
  {path:'system' ,component: SystemComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
  declarations: [],
})
export class AppRoutingModule {}
