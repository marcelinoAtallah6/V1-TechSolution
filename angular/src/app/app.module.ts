import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { CustomHTTPInterceptor } from './common/CustomHTTPInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreComponent } from './store/store.component';
import { StoreItemsComponent } from './store-items/store-items.component';
import { SystemComponent } from './system/system.component';

@NgModule({
  declarations: [AppComponent, StoreComponent, StoreItemsComponent, SystemComponent],
  imports: [
    ComponentsModule,
    MaterialModule,  
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHTTPInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}