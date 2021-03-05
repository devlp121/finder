import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { Router } from "@angular/router";


@Component({
  selector: 'app-dialoglogin',
  templateUrl: './dialoglogin.component.html',
  styleUrls: ['./dialoglogin.component.scss']
})
export class DialogloginComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppComponent>, private route: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(): void {
    this.route.navigateByUrl('login');
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
