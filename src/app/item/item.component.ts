import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';

export interface Item { name: string; }


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  private itemCol: AngularFirestoreCollection;

  addressForm = this.fb.group({
    item: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    description: [null, Validators.required],
    itemvalue: null,
    address: [null,Validators.required],
    county: [null, Validators.required],
    phoneNumber: [null, Validators.compose([
      Validators.required, Validators.minLength(9), Validators.maxLength(14)])
    ],
    lostType: ['valuable', Validators.required]
  });

  hasUnitNumber = false;

  counties = [
    {name: 'Mombasa', abbreviation: '001'},
    {name: 'Kwale', abbreviation: '002'},
    {name: 'Kilifi', abbreviation: '003'},
    {name: 'Tana River', abbreviation: '004'},
    {name: 'Lamu', abbreviation: '005'},
    {name: 'Taita/Taveta', abbreviation: '006'},
    {name: 'Garissa', abbreviation: '007'},
    {name: 'Wajir', abbreviation: '008'},
    {name: 'Mandera', abbreviation: '009'},
    {name: 'Marsabit', abbreviation: '010'},
    {name: 'Isiolo', abbreviation: '011'},
    {name: 'Meru', abbreviation: '012'},
    {name: 'Tharaka-Nithi', abbreviation: '013'},
    {name: 'Embu', abbreviation: '014'},
    {name: 'Kitui', abbreviation: '015'},
    {name: 'Machakos', abbreviation: '016'},
    {name: 'Makueni', abbreviation: '017'},
    {name: 'Nyandarua', abbreviation: '018'},
    {name: 'Nyeri', abbreviation: '019'},
    {name: 'Kirinyaga', abbreviation: '020'},
    {name: 'Murang\'a', abbreviation: '021'},
    {name: 'Kiambu', abbreviation: '022'},
    {name: 'Turkana', abbreviation: '023'},
    {name: 'West Pokot', abbreviation: '024'},
    {name: 'Samburu', abbreviation: '025'},
    {name: 'Trans Nzoia', abbreviation: '026'},
    {name: 'Uasin Gishu', abbreviation: '027'},
    {name: 'Elgeyo/Marakwet', abbreviation: '028'},
    {name: 'Nandi', abbreviation: '029'},
    {name: 'Baringo', abbreviation: '030'},
    {name: 'Laikipia', abbreviation: '031'},
    {name: 'Nakuru', abbreviation: '032'},
    {name: 'Narok', abbreviation: '033'},
    {name: 'Kajiado', abbreviation: '034'},
    {name: 'Kericho', abbreviation: '035'},
    {name: 'Bomet', abbreviation: '036'},
    {name: 'Kakamega', abbreviation: '037'},
    {name: 'Vihiga', abbreviation: '038'},
    {name: 'Bungoma', abbreviation: '039'},
    {name: 'Busia', abbreviation: '040'},
    {name: 'Siaya', abbreviation: '041'},
    {name: 'Kisumu', abbreviation: '042'},
    {name: 'Homa Bay', abbreviation: '043'},
    {name: 'Migori', abbreviation: '044'},
    {name: 'Kisii', abbreviation: '045'},
    {name: 'Nyamira', abbreviation: '046'},
    {name: 'Nairobi City', abbreviation: '047'},
  ];

  constructor(
    private fb: FormBuilder, 
    private afs: AngularFirestore,
    private storage: AngularFireStorage) {
    this.itemCol = afs.collection('items');
  }

  onSubmit() {
    alert('Item posted! Relevant information will be availed');
    this.itemCol.add(this.addressForm.value)

  }
}
