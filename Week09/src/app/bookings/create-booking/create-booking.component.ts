import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { BookingService } from '../booking.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f') form: NgForm;
  startDate: string;
  endDate: string;
  
  constructor(
    private modalCtrl: ModalController,
    private bookingSrvc: BookingService,
    private actionSheetCtlr: ActionSheetController
  ) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if(this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
        Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
        Math.random() *
          ( new Date(this.startDate).getTime()+
            6* 24 * 60 * 60 * 1000 -
            new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    if(!this.form.valid || !this.datesValid) {
      return;
    }
    this.modalCtrl.dismiss({ bookingData: {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: this.form.value['guest-number'],
      startDate: this.form.value['date-from'],
      endDate: this.form.value['date-to']
    } }, 'confirm');
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-form']);
    const endDate = new Date(this.form.value['date-form']);
    return endDate > startDate;
  }

  onBookMyPlace() {
    this.modalCtrl.dismiss({message: 'This is a dummy message!'}, 'confirm');
    this.bookingSrvc.addToMyBooking(this.selectedPlace);
  }

  async bookPlace() {
      const actionSheet = await this.actionSheetCtlr.create({
        header: 'Book Place',
        buttons: [{
          text: 'Book w/ Random Date',
          handler: () => {
            this.modalCtrl.create({ component: CreateBookingComponent,
            componentProps: this.selectedPlace 
          })
            .then(modalElement => {
              modalElement.present();
              return modalElement.onDidDismiss();
            })
            .then(resultData => {
              this.onBookMyPlace();
              console.log(resultData);
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
}
