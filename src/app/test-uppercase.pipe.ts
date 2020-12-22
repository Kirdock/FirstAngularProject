import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testUppercase'
})
export class TestUppercasePipe implements PipeTransform {

  transform(value: string): unknown {
    return value.toUpperCase();
  }

}
