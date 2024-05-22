import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gif.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey = 'Gt6RbaAcEMr1tVAB1dKOZLSLV9A5LGj1';
  private url = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    if (this.exists('history')) {
      this.searchTag(this._tagsHistory[0]);
    }
    console.log('gifs services load');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() {
    this._tagsHistory =
      localStorage.getItem('history') &&
      JSON.parse(localStorage.getItem('history')!);
  }

  private exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.url}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}
