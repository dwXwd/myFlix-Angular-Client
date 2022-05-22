import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {
  
  /**
   * Injects data from MovieCardComponent into DirectorCardComponent using the MAT_DIALOG_DATA injection token.
   * The data becomes a property on the class and is available to be output in the template.
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birth: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
