import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { ProfilePage } from '../../pages/profile/profile';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  items:any;
  text: string;

  constructor(public viewCtrl:ViewController,public navCtrl: NavController) {
    
    this.items = [
      {item:"Profile"},
      {item:"History"}
     
    ]
  }

  itemclick(item){
    this.viewCtrl.dismiss(item);
    this.navCtrl.push(ProfilePage);
    
  }

}
