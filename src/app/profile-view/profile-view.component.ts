import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserRegistrationService } from  '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  username: any = localStorage.getItem('user');
  movies: any[] = [];
  favoriteMovies: any[] = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  /**
   * calls API end-piont to get the user's data
   * @function getUserProfile
   * @returns user's data in json format
   */
  getUserProfile(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  /**
   * opens the UserEditComponent for a user to change their personal data
   */
  openEditUserProfile(): void {
    this.dialog.open(UserEditComponent, {
      width: '500px',
      panelClass: 'edit-user-custom',
    });
  }

  /**
   * gets a user's FavoriteMovies
   * @function getAllMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favoriteMovies.push(movie);
        }
      });
    });
    console.log(this.favoriteMovies);
  }

  /**
   * opens the dialog to display the SynopsisCarsComponent
   * @param title {string}
   * @param imagePath {any}
   * @param description {string}
   */
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
      panelClass: 'synopsis-custom'
    });
  }

  /**
   * opens the dialog to display the DirectorCardComponent
   * @param title {string}
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   */
  openDirectorDialog(title: string, name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Title: title,
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
      panelClass: 'director-custom'
    });
  }

  /**
   * opens the dialog to display the GenreCardComponent
   * @param title {string}
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(title: string, name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Title: title,
        Name: name,
        Description: description,
      },
      width: '500px',
      panelClass: 'genre-custom'
    });
    console.log('Name: ' + name)
  }

  /**
   * calls API end-point to remove a current logged in user from database
   * @function deleteUserProfile
   * @returns status for user has been removed
   */
  deleteUserProfile(): void {
    if (confirm('Are your sure you want to delete your account? This can\'t be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 6000,
          verticalPosition: 'top'
        });
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  /**
   * use API end-point to remove a movie from user's favorites
   * @function deleteFavoriteMovies
   * @param MovieID {string}
   * @param Title {string}
   * @returns updated user's data in json format
   */
  deleteFavoriteMovies(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe((res: any) => {
      this.snackBar.open(`Successfully removed ${Title} from favorite movies.`, 'OK', {
        duration: 4000, verticalPosition: 'top'
      });
      setTimeout(function () {
        window.location.reload();
      }, 4000);
    });
  }
}
