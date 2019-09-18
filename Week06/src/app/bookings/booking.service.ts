import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

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
    ),
    new Booking(
      'b2',
      'p2',
      'u2',
      'Scientia Residence',
      8
    )
  ]

  constructor() { }

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
