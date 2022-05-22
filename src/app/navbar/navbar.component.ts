import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) { }

  ngOnInit(): void {
  }
   
  /**
   * routes user to the movies page
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * routes user to the profile page
   */
  goToProfilePage(): void {
    this.router.navigate(['profile']);
  }
  
  /**
   * logs a user out
   * clears the localStorage
   * re-routes to the welcome screen
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'Ok', {
      duration: 2000,
      verticalPosition: 'top'
    });
    this.router.navigate(['welcome']);
  }
}
