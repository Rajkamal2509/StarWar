import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { OnlineStatusModule } from 'ngx-online-status';

import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OnlineStatusModule,
  ],
  providers: [  provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
