import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PaymentService } from './services/payment.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('pk_test_V7YcAjFfe7XRWwDapHm4iJdP00UWHc7yWM'),
    FormsModule,
    HttpClientModule
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
