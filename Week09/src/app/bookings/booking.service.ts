import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { Place } from '../../app/places/place.model';

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private bookings: Booking[] = [
    new Booking(
      'b1',
      'p1',
      'u1',
      'Ruko Bolsena',
      2
    )
  ]

  private myBookings: Place[] = [];

  constructor() { }

  addToMyBooking(p: Place) {
    this.myBookings.push(p);
  }

  removeFromMyBookings(id: string) {
    this.myBookings = this.myBookings.filter(p => {
      return p.id !== id;
    });
  }

  getMyBookings() {
    return [...this.myBookings];
  }

  getAllBookings(){
    return [...this.bookings];
  };

  deleteBooking(id: string){
    this.bookings = this.bookings.filter( booking => {
      console.log("id: ", id);
      console.log("booking.id: ", booking.id);
      return booking.id !== id;
    });
  }
}
