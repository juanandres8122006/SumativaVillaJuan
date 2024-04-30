import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase} from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp({
    "projectId":"notificaciones-7c0bd",
    "appId":"1:315405003006:web:d481a000510bba8c321daf",
    "databaseURL":"https://notificaciones-7c0bd-default-rtdb.firebaseio.com",
    "storageBucket":"notificaciones-7c0bd.appspot.com",
    "apiKey":"AIzaSyAYMX6i6ILO4c0xPRC6thwvKn0U3yRXfUk",
    "authDomain":"notificaciones-7c0bd.firebaseapp.com",
    "messagingSenderId":"315405003006"})),],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
