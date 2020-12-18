import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from '../hero.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  public hero: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location ) { }

  ngOnInit(): void {
    console.log('init');
    this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id'); // Why snapshot instead of Observable? Because we don't update the URL
                                                        // the main target for Observable on route.paramMap is to track parameter changes on the same route
                                                        // because then ngOnInit() is not called; the component is not reloaded

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe(_ => this.goBack());
  }
}
