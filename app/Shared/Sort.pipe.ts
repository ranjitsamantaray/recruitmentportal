import {Pipe,PipeTransform} from '@angular/core';
import { Candidate } from '../Recruitment/Candidate/Candidate';


@Pipe({
    name:'sort'
})
export class SortComponent implements PipeTransform{
     transform(values:any):any{
        values.sort((a: Date, b: Date) => {
            a = new Date(a.Registration_date);
            b = new Date(b.Registration_date);
        return a-b;
    });
    return values;
  }
 }
}