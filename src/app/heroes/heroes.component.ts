import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {delay, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  public heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  printValue(heroName?: string): void{
    alert(heroName || this.hero.name);
  }

  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
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
}
