import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];
  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookings = this.bookingService.getAllBookings();
  }

  ionViewWillEnter(){
    this.ngOnInit();
  }

  deleteBooking(id: string){
    this.bookingService.deleteBooking(id);
  }

}
