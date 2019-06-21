import { Component, OnInit } from '@angular/core';
import { StripeService, Token, HandleCardPaymentOptions } from 'ngx-stripe';
import { PaymentService } from './services/payment.service';
import { take } from 'rxjs/operators';

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

    subscriptionCompleted = false;
    paymentIntentCompleted = false;
    invoiceLink: string;

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
                        .then((res: any) => {
                            this.invoiceLink = res.invoiceLink;
                            this.subscriptionCompleted = true;
                        }).catch((err) => {
                            console.log(err);
                            console.log('subscription failed!');
                        });
                } else if (result.error) {
                    console.log(result.error.message);
                }
            });
    }

    purchaseItem() {
        this.paymentService.singlePurchase('July2019Report', 'lewiskos@hotmail.co.uk').then((response: any) => {
            const secret: string = response.secret;
            const defaultMethod: string = response.method;

            const options: HandleCardPaymentOptions = { payment_method: defaultMethod };

            this.stripeService.stripe.handleCardPayment(secret, options)
                .pipe(take(1)).subscribe((result) => {
                    this.paymentIntentCompleted = true;
                });
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
