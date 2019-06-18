import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {

  }

  createStripeSubscription(name, card, planString, email) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/subscription', { customerName: name, customerEmail: email, card, planType: planString })
        .subscribe((response) => {
          console.log(response);
          resolve();
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
