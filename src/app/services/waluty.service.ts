import { Injectable } from '@angular/core';
import { Currency } from './currency';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DatePipe } from '@angular/common'
import moment from 'moment';
import WalutyExternal from './waluty-external';
const Currencies: Currency[] = [
{ code: 'USD', name: 'dolar amerykański' },
{ code: 'EUR', name: 'euro' },
{ code: 'CHF', name: 'frank szwajcarski' },
{ code: 'PLN', name: 'polski złoty' },
{ code: 'GBP', name: 'funt szterling' },
];

const NBPAPI:string= 'https://api.nbp.pl/api/';
const WalutyReferencyjne:string[]=['USD,CHF,GBP,EUR,THB'] 
const ExternalService=true;

@Injectable({
  providedIn: 'root'
})
export class WalutyService {
  test:number=0;
  output
  constructor(private http: HttpClient,public datepipe: DatePipe) {
    this.test =0;
   };

  DoTest():number
  {  this.test++;
    return this.test;
  }

  GetCurse(cur:string,Day:Date){     
    return  new Observable(
      (observer) =>  {

        let url=NBPAPI+'/exchangerates/rates/a/'+cur+'/'+this.datepipe.transform(Day,'yyyy-MM-dd')+'/?format=json';
  
        this.http.get(url, {responseType: 'json'}).subscribe(output=>{
          observer.next(output['rates'][0]['mid']);   
        }
        );
      }
    );
  }
  GettabelaWalutAB()
  {
    if(ExternalService){
      let exService = new  WalutyExternal(this.http);
      return exService.GettabelaWalutAB();
    }
  }
  GettabelaWalutA()
  {  if(ExternalService){
      let exService = new  WalutyExternal(this.http);
      return exService.GettabelaWalutA();
    }
    else
    {
       return  new Observable(
      (observer) =>  
      {
        let url=NBPAPI+'/exchangerates/tables/A?format=json';
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
  }
  async GetCurrencyPowerChangesAsync(callback,DayFrom:Date,DayTo:Date,tabelaWalut:string[])
  {   
   //console.log(tabelaWalut);
     //console.log(DayFrom);
      // console.log(DayTo);
      let tabelaZbiorcza=new Object();
      let bError:boolean=false;
      let ProcProgres=0;
      let iteracja = 0;
      
      for (const waluta of tabelaWalut) {
        
        iteracja++;
        let lDayTo:Date= new Date(DayTo);
        let lDayFrom:Date= new Date(DayFrom);
        let KursPierwszy= null;
        do{   
          //   console.log(this.datepipe.transform(lDayFrom,'yyyy-MM-dd')+' '+this.datepipe.transform(lDayTo,'yyyy-MM-dd'));
          var diff = Math.abs(lDayTo.getTime() - lDayFrom.getTime());
          var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          if(diffDays>364) 
            lDayTo.setTime(lDayFrom.getTime()+364*(1000*60*60*24));
          if(lDayTo.getTime()>DayTo.getTime()) 
            lDayTo.setTime(DayTo.getTime());

          let url=NBPAPI+'/exchangerates/rates/a/'+waluta+'/'+this.datepipe.transform(lDayFrom,'yyyy-MM-dd')+'/'+this.datepipe.transform(lDayTo,'yyyy-MM-dd')+'?format=json';

          await this.http.get(url,{responseType: 'json'}).toPromise().then((res)=>{ 
            
            if(KursPierwszy==null)
              KursPierwszy=res['rates'][0].mid;
            res['rates'].map((rate)=>{
              if (tabelaZbiorcza[rate.effectiveDate]==undefined) 
                tabelaZbiorcza[rate.effectiveDate]={
                  date:rate.effectiveDate,
                  mid:rate.mid/KursPierwszy
                }
                else 
                tabelaZbiorcza[rate.effectiveDate]={
                  date:rate.effectiveDate,
                  mid:rate.mid/KursPierwszy+tabelaZbiorcza[rate.effectiveDate].mid
                }                    
            }
            )

          }
          ).catch(error => { // (**)

            bError= true;
            console.log(url+' '+error)

          }
          );
          
          lDayFrom.setTime(lDayTo.getTime()+1*(1000*60*60*24));
          lDayTo.setTime(lDayFrom.getTime()+364*(1000*60*60*24));
              
        } while ((lDayFrom.getTime()<=DayTo.getTime())) 
        ProcProgres = iteracja*100/ tabelaWalut.length;
        callback({
                  datatype:'progress',
                  data:ProcProgres
                });
      }
      if(bError){
        alert('The unknown error has occurred');
          // return;
      }

      for (var key in tabelaZbiorcza){   
        
        tabelaZbiorcza[key].mid= (tabelaWalut.length)/tabelaZbiorcza[key].mid;
      }
      callback({
                  datatype:'dataoutput',
                  data:tabelaZbiorcza
                });
  }
  GetCurrencyPowerChanges(cur:string,table:string,DayFrom:Date,DayTo:Date,tabelaWalut:string[])
  {   
    console.log('GetCursevalueRange for '+cur);
     if(ExternalService){
      let exService = new  WalutyExternal(this.http);
      return exService.GetCurrencyPowerChanges(cur,table,DayFrom,DayTo,tabelaWalut);
    }
    else
    {

      return  new Observable((observer) =>{    
        
        console.log('GetCurrencyPowerChanges');
        this.GetCurrencyPowerChangesAsync((data)=>{
          observer.next(data);
        },DayFrom,DayTo,tabelaWalut );

      }
      )
    }
  } 
  GetCurseRange(cur:string,DayFrom:Date,DayTo:Date){ 
    return  new Observable(
      (observer) =>  {
      
        let url=NBPAPI+'/exchangerates/rates/a/'+cur+'/'+this.datepipe.transform(DayFrom,'yyyy-MM-dd')+'/'+this.datepipe.transform(DayTo,'yyyy-MM-dd')+'?format=json';
        console.log(url);
        this.http.get(url, {responseType: 'json'}).subscribe(output=>{
          observer.next(output['rates'].map(function(obj){
            return {
              x:moment(obj.effectiveDate).diff( moment(DayFrom),'days'),// obj.effectiveDate,
              y: obj.mid,
              label:obj.effectiveDate
            }  
          } 
          )
          );   
        });
      }
    )
  }



}