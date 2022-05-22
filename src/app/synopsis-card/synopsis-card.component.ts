import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  constructor(

    /**
     * Uses Inject to get the movie details from the movie object
     * @param data
     */
   @Inject(MAT_DIALOG_DATA)
   public data: {
     Title: string,
     ImagePath: any,
     Description: string,
     Genre: string,
   }
  ) { }

  ngOnInit(): void {
  }

}
