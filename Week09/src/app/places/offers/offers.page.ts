import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { MenuController, IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
     private menuCtrl: MenuController,
     private router: Router
    ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places;
    })
  }

  ngOnDestroy() {
    this.placesSub.unsubscribe();
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
