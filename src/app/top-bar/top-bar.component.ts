import { Component, OnInit } from '@angular/core';
import { WalutyService } from '../services/waluty.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit 
{
   test:string;
  constructor(WS:WalutyService ) 
  {

  }

  ngOnInit() 
  {
  }

}