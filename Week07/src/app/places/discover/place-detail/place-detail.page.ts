import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    // this.modalCtrl
    //   .create({
    //     component: CreateBookingComponent,
    //     componentProps: { selectedPlace: this.place }
    //   })
    //   .then(modalEl => {
    //     modalEl.present();
    //     return modalEl.onDidDismiss();
    //   });
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
    .create({
      component : CreateBookingComponent,
      componentProps: { selectedPlace: this.place }
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirm') {
        console.log('BOOKED');
      }
    });
  }

  // bookThisPlace() {
  //   this.loadingCtrl.create({
  //     keyboardClose: true,
  //     message: 'Booking the place ...'
  //   })
  //   .then(loadingEl => {
  //     loadingEl.present();
  //     setTimeout(() => {
  //       this.modalCtrl.dismiss({message: 'booked!'}, 
  //       'confirm');
  //     }, 2000);
  //   });
  // }

  // bookPlace() {
  //   this.modalCtrl.create({ component: CreateBookingComponent })
  //     .then(modalElement => {
  //       modalElement.present();
  //     })
  // }

}
