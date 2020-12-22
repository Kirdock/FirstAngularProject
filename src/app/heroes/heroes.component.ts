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


  constructor(private heroService: HeroService) { }

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

  add(name: string): void {
    name = name.trim();
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
          this.heroes.push(hero);
        }
      );
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero)
      .subscribe(_ => {
        this.heroes = this.heroes.filter(h => h !== hero);
      });
  }
}
