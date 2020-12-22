import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  private undefinedVal: any;
  public inputValue!: string;
  public color = 'yellow';

  constructor() { }

  ngOnInit(): void {
  }

  testEquals(): void{
    const a = {test: 'abc'};
    const b = {test: 'abc'};
    const c = a;
    console.log('a = b', a === b);
    console.log('a = c', a === c);
    console.log('b = c', b === c);
  }

  pipeNextTest(): void{
    const obj = new BehaviorSubject<any>(0);
    const myExample = {test: 'abc'};
    obj.pipe(map(console.log));
    obj.next(myExample);
    obj.subscribe(() =>
      (console.log('sub'))); // => only one element. the first one is overwritten. For the first one, there wasn't a subscribe available
    console.log('value', obj.getValue());
  }

  pipeReferenceTest(): void{
    const obj = new BehaviorSubject<any>(0);
    const myExample = {test: 'abc'};
    let counter = 0;
    obj.subscribe((val) => {
      console.log('next', val);
      myExample.test = '21212122121 ' + counter;
      counter++;
    });
    obj.next(myExample); // => reference. in subscribe (next) there is the same object
    console.log('value', obj.getValue());
  }

  undefinedTest(): void{
    console.log(this.undefinedVal);
  }

  undefinedTestInput(): void {
    console.log(this.inputValue); // same as in Vue. default value stays undefined
  }

  showValue(color: string): void {
    console.log(color);
  }
}
