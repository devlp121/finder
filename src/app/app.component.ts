import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogloginComponent } from './dialoglogin/dialoglogin.component';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSignedin: boolean = false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private router: Router) {
    this.afAuth.onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)


      } else {
        // No user is signed in.
        console.log(user)
      }
    });
  }

  signOut() {
    this.afAuth.signOut()
  }

  openDialog() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.router.navigateByUrl('item')

      } else {
        // No user is signed in.
        const dialogRef = this.dialog.open(DialogloginComponent, {
          width: '300px',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('User redirected');
          this.router.navigateByUrl("login")
        });
        
      }
    });

  }


}