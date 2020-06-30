import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const CURR_SERVICE_API:string= 'https://currencyservice--damiand1.repl.co';
@Injectable()
export class WalutyExternal {



  constructor(private http: HttpClient) { }

  GettabelaWalutA()
  {
       return  new Observable(
      (observer) =>  
      {
        let url=CURR_SERVICE_API+'/?query=GettabelaWalutA';
        console.log(url);
         this.http.get(url,{responseType: 'json'}).subscribe((res)=>
         {    let out= res[0]['rates'].map((rate)=>
              {
                return { 
                  code:rate.code,
                  name:rate.currency
                }
              }  
              );
             // console.log(out);
              observer.next(out );
         
         });//(url, {responseType: 'json'});
      })
  }
  GetCurrencyPowerChanges(cur:string,DayFrom:Date,DayTo:Date,tabelaWalut:string[])
  {   
    console.log('GetCursevalueRange');
    return  new Observable((observer) =>{    
      
         let url=CURR_SERVICE_API;
         console.log(url);
         this.http.post<any>(url,{
                                    "Query":"GetCurrencyPowerChanges",
                                    "DayFrom": DayFrom,
                                    "DayTo": DayTo,
                                    "tabelaWalut":JSON.stringify(tabelaWalut.map((data)=>{code:data})),
                                    "Curr": cur
                                 },{responseType: 'json'}).subscribe((res)=>{    
           
           let tabelaZbiorcza=new Object();
           JSON.parse(res).forEach(obj => {
                tabelaZbiorcza[obj.date]={
                  date:obj.date,
                  mid:obj.mid;
                } 
            });
    

          observer.next( { 
                          datatype:'dataoutput',
                          data:tabelaZbiorcza
                         }
          )
  
         
         });//(url, {responseType: 'json'});

    }
    )
  } 

}