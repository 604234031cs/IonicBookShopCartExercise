import { Component } from '@angular/core';
import { NavController,  ModalController, PopoverController ,NavParams,LoadingController  } from 'ionic-angular';
import { BookCategoryPage } from '../book-category/book-category';
import { CartPage } from '../cart/cart';
import { TopsellerPage } from '../topseller/topseller';
import { PopoverComponent } from '../../components/popover/popover';
import { BookRestProvider } from '../../providers/book-rest/book-rest';
import { Book } from '../../../models/book.model';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  numItem: number;  
  total:number;
  books:Book;
  category:string;
  loading: any;

  constructor(private bookRestProvider:BookRestProvider,public modalCtrl:ModalController, public navCtrl: NavController,public popoverCtr:PopoverController ,public navParams: NavParams,public loadingController:LoadingController ) {

  }

  showCart(){    
    let modal=this.modalCtrl.create(CartPage);
    modal.onDidDismiss( (data)=>{
      if (data.clear==true){
        this.refreshNumItem();
      }      
    });
    modal.present();   
     
  }

  refreshNumItem(){
    if (localStorage.getItem('numItem')==null || Number.isNaN(Number(localStorage.getItem('numItem')))){      
      localStorage.setItem('numItem','0');
      this.numItem=0;
    }else{
      this.numItem=Number(localStorage.getItem('numItem'));
    }
  }


  


  goToPageTopSell(){
    this.navCtrl.push(TopsellerPage);
  }

  goToPageCategory(){
    this.navCtrl.push(BookCategoryPage);
  }

  presentPopover(myEvent){
    let popover = this.popoverCtr.create(PopoverComponent);
    popover.present({
      ev: myEvent
  });
  popover.onDidDismiss(popoverData =>{
    console.log(popoverData);
  });
  
  }

  ionViewWillEnter(){        
    this. loading = this.loadingController.create({ content: "please wait..." });
    this.loading.present();   

    this.refreshNumItem();
    
    
    this.bookRestProvider.gettopsellerlist().subscribe(  
      data=>{                
          this.books=data.filter(book => (book!=null)); 
          this.loading.dismissAll();
      } 
      ,
      (err) => {
        this.loading.dismissAll();
        console.log(err);
      }
    );
    
  }

}
