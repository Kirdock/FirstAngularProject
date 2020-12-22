import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('HeroService: fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`HeroService: fetched hero id=${id}`)),
        catchError(this.handleError<Hero>('getHero'))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * <p>Let the app continue.</p>
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): any{
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(newHero => this.log(`added hero id=${newHero.id}`)),
        catchError(this.handleError('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<any>{
    // @ts-ignore
    const id = hero?.id ?? hero;
    return this.http.delete(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError('delete hero'))
      );
  }

  searchHero(term: string): Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(results => results.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError('searchHeroes', []))
      );
  }
}
