import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtlr: ActionSheetController
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtrl.dismiss({message: 'This is a dummy message!'}, 'confirm');
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
