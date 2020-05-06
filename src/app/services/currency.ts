export class Currency {
   constructor(code:String)
   {
       this.name = CurrArr['EUR'];
       this.code= code;
      // console.log('this.name '+this.name);
   }
  code:string;
  name:string;
  testObject: { [key: number]: string } =
  {
    1: 'Object Value 1',
    2: 'Object Value 2',
    3: 'Object Value 3'
  };
}
interface ICurrenciesArray {
     [index: string]: string;
}
//const map: { [key: string]: srting } = { };
const CurrArr: { [key: string]: string } =
    {'USD': 'dolar amerykański',
    'EUR': 'euro',
    'CHF':  'frank szwajcarski',
    'PLN': 'polski złoty',
    'GBP': 'funt szterling'};
   /*
    [ 'EUR', 'euro'],
     [  'CHF',  'frank szwajcarski'],
     [ 'PLN', 'polski złoty'],
      [ 'GBP', 'funt szterling']
];*/

