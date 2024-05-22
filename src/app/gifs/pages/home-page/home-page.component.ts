import { Component } from '@angular/core';
import { Gif } from '../../interfaces/gif.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(private GifsService: GifsService) {}

  get gifs(): Gif[] {
    return this.GifsService.gifList;
  }
}
