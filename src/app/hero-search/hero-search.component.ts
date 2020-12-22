import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import {Observable, Subject} from 'rxjs';
import {Hero} from '../hero';
import {debounceTime, delay, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  public heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHero(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
