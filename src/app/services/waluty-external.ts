import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders,HttpResponse} from '@angular/common/http';
const CURR_SERVICE_API:string= 'https://currencyservice.damiand1.repl.co';
const httpOptions = {
  headers: new HttpHeaders({}),
  withCredentials: true
};
@Injectable()
export default class WalutyExternal {



  constructor(private http: HttpClient) { }

  GettabelaWalutA()
  {
       return  new Observable(
      (observer) =>  
      {
        let url=CURR_SERVICE_API+'/?query=GettabelaWalutA';
        console.log(url);
         this.http.get<any>(url,httpOptions).subscribe((res:HttpResponse<any>)=>
         { console.log(res);   
     //    console.log('response from server:',res);
  //console.log('response headers',res.headers.keys())
           let out= res[0]['rates'].map((rate)=>
              {
                return { 
                  code:rate.code,
                  name:rate.currency
                }
              }  
              );
             // console.log(out);
              observer.next(out );
         
         });//(url, {responseType: 'json'})



      })
  }
  GetCurrencyPowerChanges(cur:string,DayFrom:Date,DayTo:Date,tabelaWalut:string[])
  {   
    console.log('GetCursevalueRange');
    return  new Observable((observer) =>{    
      
      let url=CURR_SERVICE_API;
      let Done=false;
      let Token = Math.round(Math.random()*10000);
      this.http.post<any>(url,{
                                    "Query":"GetCurrencyPowerChanges",
                                    "DayFrom": DayFrom,
                                    "DayTo": DayTo,
                                    "tabelaWalut":JSON.stringify(tabelaWalut),
                                    "Curr": cur,
                                    "Token":Token
                                 },httpOptions).subscribe((res)=>{    
           
           let tabelaZbiorcza=new Object();
        //   console.log(res);
           res.forEach(obj => {
                tabelaZbiorcza[obj.date]={
                  date:obj.date,
                  Wskaznik:obj.Wskaznik
                } 
            });
    
          Done=true;
          observer.next( { 
                          datatype:'dataoutput',
                          data:tabelaZbiorcza
                         }
          )
  
         
      });//(url, {responseType: 'json'});
      let http=this.http;

      let CheProgress=function(){
        setTimeout(function(){ 
          http.post<any>(url,{
                                    "Query":"GetDataProgress",
                                    "Token":Token
                                 },httpOptions).subscribe((res)=>{    
           // console.log('observer.next '+JSON.stringify(res));
            if(res.datatype== 'progress') {
              observer.next(res);
            }
       
            if (!Done){
              CheProgress();
           }
         
          }); 
        },300);   
      }
      CheProgress();

    }
    )
  } 

}