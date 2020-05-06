import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-my-date-picker',
  templateUrl: './my-date-picker.component.html',
  styleUrls: ['./my-date-picker.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MyDatePickerComponent implements OnInit {
   @ViewChild('input') input: any;

  dateFilter = (d: Date): boolean => 
  {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  @Input() public caption:string;
  constructor(public datepipe: DatePipe) 
  {

  };

  ngOnInit() {
  }
  getDate()
  {  
    return this.input.nativeElement.value;
  }
  setDate(date:Date)
  {
     this.input.nativeElement.value = this.datepipe.transform(date,'yyyy-MM-dd');
  }
  myFilter(d: Date): boolean 
  { let dd:Date= new Date(d);  

		const day =dd.getDay()
     //console.log('endd'+d.toISOString());
    const month = dd.getMonth();
		const todays_date = dd.getDate();
		const todaysDateObject = new Date();
		const today = todaysDateObject.getDate();
    const actualMonth = todaysDateObject.getMonth();

    if (month === actualMonth && todays_date === today) 
    {
      return false;
    } 
    else if (day !== 0 && day !== 6) 
    {
      return true;
    } else 
    {
      return false;
    }
	}

}