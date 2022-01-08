import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterText:string): CarDetail [] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((d:CarDetail)=>(
    d.carName.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    d.brandName.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    d.colorName.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    d.dailyPrice.toString().toLocaleLowerCase().indexOf(filterText)!==-1 ||
    d.modelYear.toString().toLocaleLowerCase().indexOf(filterText)!==-1  )):value;
   
   
  }

}

