import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app-routing.module';
import { BlackJackService } from './services/black_jack/black-jack.service';
import { MainViewComponent } from './main-view/main-view.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    APP_ROUTES
  ],
  providers: [
    BlackJackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
