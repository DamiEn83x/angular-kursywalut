import { Component, OnInit ,Input,OnChanges,SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-check-box-list',
  templateUrl: './check-box-list.component.html',
  styleUrls: ['./check-box-list.component.css']
})
export class CheckBoxListComponent implements OnInitt, OnChanges   {

  constructor() { }
  
  @Input() public  columns:number;

  ngOnInit() 
  {
     this.CalcArray();
  }
  areAllSelected = false;
  Items2D:{}[][]=[[]];
  
  @Input() public items:{}[];

  GetSelectedItems()
  {
    let RetArray:string[]=[];
    for (let r = 0; r < this.Items2D.length ; r++) 
     {
        for (let c = 0; c < this.Items2D[r].length ; c++) 
        {
            if(this.Items2D[r][c].selected)
              RetArray.push(this.Items2D[r][c].code)
        }
     }

     return RetArray;
  }
  setSelected(selectedArray)
  {  console.log(this);
     for (let r = 0; r < this.Items2D.length ; r++) 
     {
        for (let c = 0; c< this.Items2D[r].length ; c++) 
        {
                this.Items2D[r][c].selected = selectedArray.includes(this.Items2D[r][c].code);
        }
     }
   //  this.Items2D = this.Items2D.map(item => ({ ...item, selected: selectedArray.includes(item.code) }));
  }

  toggleAllSelection() {
    this.areAllSelected = !this.areAllSelected;
      for (let r = 0; r < this.Items2D.length ; r++) 
     {
        for (let c = 0; c < this.Items2D[r].length ; c++) 
        {
                this.Items2D[r][c].selected =  this.areAllSelected;
        }
     }
  }
  CalcArray()
  { 
     let c:number=0;
      let r:number=0;
            console.log('CalcArray');
      if(this.items==undefined)       
        return; 
     // console.log(this.items);
      for (let i = 0; i < this.items.length ; i++) 
      {
         if(c>=this.columns)
         {
           c=0;
           r++;
           this.Items2D[r]=[];
         }
        this.Items2D[r][c]={ ...this.items[i]};
          c++;
      }
     // this.Items2D[0][0]='aa';

      //console.log(this.Items2D)
  }

  ngOnChanges(changes: SimpleChanges) 
  {
    // changes.prop contains the old and the new value...
   this.CalcArray();
  
  }

}