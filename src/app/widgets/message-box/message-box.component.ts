import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  constructor() { }
  MessageItems:{}[]=[];
  bShowMessages=false;
  AddErrorMessage(Msg:string){
      this.MessageItems.push({
        Message:Msg,
        AlertType:'danger'
      });
      this.bShowMessages =true;
  }
  ClearMessages(){
    this.MessageItems=[];
    this.bShowMessages = false;
  }


  ngOnInit() {
  }

}