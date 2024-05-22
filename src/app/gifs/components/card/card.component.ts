import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input()
  public gif1!: Gif;

  ngOnInit(): void {
    if (!this.gif1) throw new Error('Gif property is required');
  }
}
