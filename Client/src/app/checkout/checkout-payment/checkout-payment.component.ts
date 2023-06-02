import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submitOrder(){
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: (order : any) => {
        this.toastr.success('Order Created Successfuly');
        this.basketService.deleteLocalBasket(basket.id);
        console.log(order);
      },
      error: (error) => {
        this.toastr.error(error.message);
        console.log(error);
      }
    })
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId : basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.value,
      shipToAdress: this.checkoutForm.get('addressForm')?.value
    }
  }

}
