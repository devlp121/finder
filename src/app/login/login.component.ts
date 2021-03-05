import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AppComponent } from "../app.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    passcode: [null, Validators.compose([
      Validators.required, Validators.minLength(6)])
    ],
  });

  registerForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    passcode: [null, Validators.compose([
      Validators.required, Validators.minLength(9)])
    ],
  });
  private userCol: AngularFirestoreCollection;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta,
    private appC: AppComponent,
    private fb: FormBuilder
  ) {
    this.userCol = afs.collection('users');

    this.afAuth.onAuthStateChanged(function(user) {
      if (user) {
        router.navigateByUrl('profile')
      } else {
        // No user is signed in.
      }
    });
  }
  onSignin() {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.get('email')?.value, this.loginForm.get('passcode')?.value).catch((error) => {
      let snackBarRef = this.snackBar.open(error.message, '', {
        duration: 3000
      });
    });
  }
  onRegister() {
    this.afAuth.createUserWithEmailAndPassword(this.registerForm.get('email')?.value, this.registerForm.get('passcode')?.value).catch((error) => {
      let snackBarRef = this.snackBar.open(error.message, '', {
        duration: 3000
      });
    });
    this.userCol.add(this.registerForm.value)

  }

  ngOnInit() {
    this.title.setTitle('Login: Finder');
    this.meta.updateTag({ content: 'Authentication' }, "name='description'");
  }


  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('');
  
  }


}
