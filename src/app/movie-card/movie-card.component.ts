import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any = null;

  constructor(
    public fetchApiData: UserRegistrationService, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    public router: Router
    ) { }


  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
  }

  /**
   * uses API end-point to get a list of all movies in json format
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * opens the dialog to display the information from DirectorCardComponent
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
      panelClass: 'director-custom'
    });
    console.log(name)
  }

  /**
   * opens the dialog to display the information from GenreCardComponent
   * @param name {string}
   * @param description {string}
   */
  
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
      panelClass: 'genre-custom'
    });
  }

  /**
   * opens the dialog to display the information from SynopsisCardComponent
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
   * gets the current logged in user's data
   * @function getUserProfile
   * @returns the current logged in user's data
   */
  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUserProfile().subscribe((res: any) => {
      console.log(res)
      const currentUser = res.Username
      console.log(currentUser)
      const currentFavs = res.FavoriteMovies
      console.log(currentFavs)
    });
  }

  /**
   * use API end-point to add a movie to user's favorites
   * @function addFavoriteMovies
   * @param id {string}
   * @param Title {string}
   * @returns an array of the movie object in json format
   */

  addToUserFavs(id: string, Title: string): void {
    console.log(id);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`Successfully added ${Title} to favorite movies.`, 'OK', {
        duration: 4000,
        verticalPosition: 'top'
      });
      console.log(res)
      this.ngOnInit();
    });
  }

  /**
   * user API end-point to remove a movie from user's favorites
   * @function deleteFavoriteMovies
   * @param id {string}
   * @param Title {string}
   * @returns updated user's data in json format
   */

  deleteFavoriteMovies(id: string, Title: string): void {
    console.log(id)
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favorites`, 'OK', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.ngOnInit();
      console.log(res)
    });
    return this.getCurrentUser();
  }
}
