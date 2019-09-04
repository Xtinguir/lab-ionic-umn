import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  places: Place[];
  constructor(private placesService: PlacesService, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.places = this.placesService.getAllPlaces();
  }

  ionViewWillEnter(){
    this.ngOnInit();
  }

  onOpenMenu(){
    this.menuCtrl.toggle('m1');
  }
}
