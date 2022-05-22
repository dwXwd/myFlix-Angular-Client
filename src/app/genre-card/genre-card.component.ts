import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  /**
   * Injects data from MovieCardComponent into GenreCardComponent using the MAT_DIALOG_DATA injection token.
   * The data becomes a property on the class and is available to be output in the template.
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
