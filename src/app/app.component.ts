import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }
// This is the function that will open the dialog when the signup button is clicked  
openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    width: '280px'
    });
  }

    /**
   * opens the user login dialog when login button is clicked
   */
     openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
        // Assign dialog width
        width: '280px'
      });
    }  
    openMoviesDialog(): void {
      this.dialog.open(MovieCardComponent, {
        width: '500px'
      });
    }
}