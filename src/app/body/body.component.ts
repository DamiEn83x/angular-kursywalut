import { Component, OnInit,ViewChild,ElementRef, } from '@angular/core';
import { WalutyService } from '../services/waluty.service';
import { Currency } from '../services/currency';
import { CheckBoxListComponent } from '../widgets/check-box-list/check-box-list.component';
import { MyDatePickerComponent } from '../widgets/my-date-picker/my-date-picker.component';
import moment from 'moment';
import { MessageBoxComponent } from '../widgets/message-box/message-box.component';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
   test
   test2
   CurrData;
   CurrLabels;
   WalutyRef;
   WalutyRefAll; 
   WalutyRefAllAB; 
   CurrSelected;
   WS:WalutyService;
   @ViewChild('walutyListChecBox') walutyListChecBox: any;
  @ViewChild('DPOd') DPOd: MyDatePickerComponent;
  @ViewChild('DPDo') DPDo: MyDatePickerComponent;
  @ViewChild('MessageBox') MessageBox:MessageBoxComponent;
  CurrencySelect: any;
  
  DataDo:Date= new Date();
  DataOd:Date =new Date();

  spinnercolor = 'primary';
  spinnermode = 'indeterminate';
  spinnervalue = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  ProgressBarWidth =0;
  // Display progress spinner for 3 secs on click of button

  constructor(WS:WalutyService) { 
    this.WS= WS;
    this.CurrSelected = 'PLN';
    this.DataOd.setTime(this.DataDo.getTime()-180*(1000*60*60*24));
  }

  showProgressSpinner()
  {
    this.displayProgressSpinner = true;
  };

  OdswiezWalutyRef()
  {  
    this.MessageBox.ClearMessages();
    this.showProgressSpinner();
    this.WalutyRef= this.walutyListChecBox.GetSelectedItems();
    this.DataOd = new Date(moment(this.DPOd.getDate(), "YYYY-MM-DD").format("YYYY/MM/DD"));
    this.DataDo = new Date(moment(this.DPDo.getDate(), "YYYY-MM-DD").format("YYYY/MM/DD")); 
    this.WyswietlZmianyKursow();
    
  }

  WyswietlZmianyKursow()
  {//console.log(this.WalutyRef);  
    if((this.WalutyRef==undefined) || (this.WalutyRef.length==0))
      {
        this.MessageBox.AddErrorMessage('Brak pozycji walut referencyjnych');
      }    
      this.WS.GetCurrencyPowerChanges(this.CurrSelected,this.DataOd,this.DataDo,this.WalutyRef).subscribe((res)=>{ 
        if(res.datatype=='dataoutput') {
          this.test2= res.data;
          var array_keys = new Array();
          var array_values = new Array();

          for (var key in res.data) {   
            
            array_values.push({y:res.data[key].Wskaznik,label:key});

          }
          this.CurrData = array_values.map(a =>  [a.label,a.y] );//res.map(a => a.y );
          setTimeout(()=>{
            this.displayProgressSpinner = false;        
            this.ProgressBarWidth = 0; 
          }
          ,1500);
 
        }
        else if(res.datatype=='progress') {
          //console.log('body '+res.data);
          this.ProgressBarWidth = Math.round( res.data);
        } 
      }
      );

  }
    UstawKontrolkiNaBiezaceParametry()
    { 
       this.WalutyRefAll=this.WalutyRefAll.map((item)=>
       {

        let  a=item;
        var found = false;
        for(var i = 0; i < this.WalutyRefAll.length; i++) 
        {
            if (this.WalutyRefAll[i].code == a.code) 
            {
              found = true;
              break;
            }
        }
         a.selected =  found;
         return a;

       }
       );
       this.DPOd.setDate(this.DataOd);
       this.DPDo.setDate(this.DataDo);
 
    }
  ngOnInit() {
     this.WS.GettabelaWalutAB().subscribe((ret)=>
     {    this.showProgressSpinner();
        this.WalutyRefAllAB=ret;
        this.WalutyRefAllAB.push({code:'PLN',name:'Polski złoty'})
      this.WS.GettabelaWalutA().subscribe((ret)=>
      {    this.showProgressSpinner();
        this.WalutyRef=ret.map((waluta)=>{return waluta.code});
       // console.log('WalutyRefAll');
        this.WalutyRefAll=ret;
        this.WalutyRefAll.push({code:'PLN',name:'Polski złoty'})
       // console.log(this.WalutyRefAll);
        this.UstawKontrolkiNaBiezaceParametry();
        this.WyswietlZmianyKursow();
  
      })
     })




  }
  CurrvalueChange(event){
  console.log("selected value",this.CurrencySelect);
  this.CurrSelected = this.CurrencySelect;

}

}