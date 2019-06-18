import { Component, OnInit } from '@angular/core';
import { StripeService, Token } from 'ngx-stripe';
import { PaymentService } from './services/payment.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'stripe-presentation-frontend';

    card: any;
    stripeElements;
    customerName: string;
    customerEmail: string;

    planString = 'platinum';

    completed = false;

    constructor(private stripeService: StripeService, private paymentService: PaymentService) {

    }

    startSubscription() {
        const name = this.customerName;
        this.stripeService
            .createToken(this.card, { name })
            .subscribe((result) => {
                if (result) {
                    const token: Token = result.token;
                    console.log(result.token);
                    this.paymentService.createStripeSubscription(this.customerName, token.id, this.planString, this.customerEmail)
                        .then((res) => {
                            this.completed = true;
                        }).catch((err) => {
                            console.log('subscription failed!');
                        });
                } else if (result.error) {
                    console.log(result.error.message);
                }
            });
    }

    ngOnInit() {
        this.stripeService.elements().subscribe((elements) => {
            this.stripeElements = elements;

            if (!this.card) {
                this.card = this.stripeElements.create('card', {
                    style: {
                        base: {
                            iconColor: '#666EE8',
                            color: '#31325F',
                            lineHeight: '40px',
                            fontWeight: 300,
                            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                            fontSize: '18px',
                            '::placeholder': {
                                color: '#CFD7E0'
                            }
                        }
                    }
                });
                this.card.mount('#card-element');
            }
        });
    }
}
