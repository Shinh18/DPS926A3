import { Injectable } from '@angular/core';
import { Size } from '../model';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  constructor() { }

  private sizes: Size[] = [
    { 
      title:'large',
      price: 12
    },
    {
      title:'medium',
      price: 10
    },
    { 
      title:'small',
      price: 8
    },
    {
      title:'party',
      price: 6
    }
  ];

   getAllSizes() {
     return [...this.sizes];
   }

   getSize(sz){
     return {...this.sizes.find(
       size => { return size.title === sz; }
       )
     }
   }

   getSizePrice(sz){
    for(let size of this.sizes){
      if(size.title === sz)
        return size.price;
    }
  }
}
