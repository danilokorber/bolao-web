import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'authorizing-payment',
  templateUrl: './payment.component.html',
  styles: [],
})
export class PaymentComponent {
  @Output() onStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSkip: EventEmitter<any> = new EventEmitter<any>();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  public payPalConfig: IPayPalConfig = {
    fundingSource: 'PAYPAL',
    currency: 'EUR',
    clientId: environment.configs.paypal.clientId,
    createOrderOnClient: (data) =>
      <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '10',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '10',
                },
              },
            },
            items: [
              {
                name: 'WM2022 - Danilo Körber',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '10',
                },
              },
            ],
          },
        ],
      },
    advanced: {
      commit: 'true',
    },
    style: {
      label: 'paypal',
      layout: 'vertical',
    },
    onApprove: (data, actions) => {
      console.log(
        'onApprove - transaction was approved, but not authorized',
        data,
        actions
      );
      actions.order.get().then((details: any) => {
        console.log(
          'onApprove - you can get full order details inside onApprove: ',
          details
        );
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - transaction was authorized', data);
      if (this.authService.profile) {
        this.usersService
          .confirmPayment(this.authService.profile.id)
          .subscribe({
            next: (profile) => {
              this.authService.profile = profile;
              this.onConfirm.emit();
            },
          });
      }
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.onCancel.emit();
    },
    onError: (err) => {
      console.log('OnError', err);
      this.onError.emit();
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
      this.onStart.emit();
    },
  };

  get language(): string {
    return this.authService.language;
  }

  skip(): void {
    this.onSkip.emit(true);
  }
}
