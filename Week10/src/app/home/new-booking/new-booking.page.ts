import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.page.html',
  styleUrls: ['./new-booking.page.scss'],
})
export class NewBookingPage implements OnInit {

  constructor(private modalCtrl: ModalController, private bookingSvc: BookingsService) { }

  ngOnInit() {
  }

  addNewBooking(f: NgForm) {
    this.bookingSvc.insertBooking({
      'booking_name': f.value.bookingName,
      'topic': f.value.topic,
      'details': f.value.details,
      'booking_date': f.value.bookingDate,
      'start_hour': f.value.startHour,
      'end_hour': f.value.end_hour,
      'creator': f.value.creator,
    })
      .subscribe(
        () => {
          this.bookingSvc.fetchBookings()
            .subscribe((bookings) => {
              console.log(bookings);
            });
          console.log("INSERTED");
          this.closeModal();
        }
      );
  }
}
