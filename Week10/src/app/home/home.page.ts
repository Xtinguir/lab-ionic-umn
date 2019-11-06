import { Component, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Booking } from './new-booking/booking.interface';
import { AlertController, ModalController } from '@ionic/angular';
import { Todo, TodoService } from '../services/todo.service';
import { NewBookingPage } from './new-booking/new-booking.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  todos: Todo[];
  private bookings: Booking[] = [];

  constructor(private todoService: TodoService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private bookingSvc: BookingsService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }

  getBookings() {
    this.bookingSvc.fetchBookings()
      .subscribe((bookings) => {
        console.log(bookings);
      });
  }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Delete a Booking',
      inputs: [
        {
          name: 'bookingId',
          type: 'text',
          placeholder: 'Enter your booking ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.bookingSvc.deleteBooking(data.bookingId)
              .subscribe(() => {
                this.bookingSvc.fetchBookings()
                  .subscribe((bookings) => {
                    console.log(bookings);
                  });
                console.log("DELETED");
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: NewBookingPage
    });
    return await modal.present();
  }

  newBooking() {
    this.presentModal();
  }

  deleteBooking() {
    this.presentAlertPrompt();
  }
}
