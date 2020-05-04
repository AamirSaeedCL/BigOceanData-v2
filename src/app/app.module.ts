import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapModule } from './modules/map/map.module';

const COMPONENTS = [
  AppComponent
];

const FEATURE_MODULES = [
  MapModule
];

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  ...FEATURE_MODULES
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
   ...MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
