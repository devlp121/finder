import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})


export class AddItemComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  constructor(
    private _formBuilder: FormBuilder, 
    private storage: AngularFireStorage, 
    private afs: AngularFirestore) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const currentDay = new Date().getDay();


      this.minDate = new Date(currentYear - 0, currentMonth, currentDay);
      this.maxDate = new Date(currentYear + 1, 11, 31);
     }


  ngOnInit() {
  }

}
