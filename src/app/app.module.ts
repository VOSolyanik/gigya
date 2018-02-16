import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AccountOptionsComponent } from './account-options/account-options.component';
import { HomeComponent } from './home/home.component';
import { ReadonlyComponent } from './readonly/readonly.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountOptionsComponent,
    HomeComponent,
    ReadonlyComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    ReactiveFormsModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
