import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { MenuController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  places: Place[];
  constructor(
    private placesService: PlacesService,
     private menuCtrl: MenuController,
     private router: Router
    ) { }

  ngOnInit() {
    this.places = this.placesService.getAllPlaces();
  }

  ionViewWillEnter(){
    this.ngOnInit();
  }

  onOpenMenu(){
    this.menuCtrl.toggle('m1');
  }

  editOffer(id: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
  }
}
