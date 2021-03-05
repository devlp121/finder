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

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  private itemCol: AngularFirestoreCollection;
  private userCol: AngularFirestoreCollection;



  constructor(
    private _formBuilder: FormBuilder, 
    private storage: AngularFireStorage, 
    private afs: AngularFirestore) {
      this.itemCol = this.afs.collection('items');
      this.userCol = this.afs.collection('users')

     }

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
  types: Type[] = [
    {name: 'Document', desc: 'Particulars and money alike'},
    {name: 'Machinery', desc: 'Tangible technological artifacts'},
    {name: 'Perishable', desc: 'Limited life period items'},
    {name: 'Non-valuables', desc: 'Items of sentimental value'},
    {name: 'Artefact', desc: 'Objects of cultural and historical interest'},
    {name: 'Other', desc: 'Items not included in the selection choices'},

  ];

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      address: [null, Validators.required],
      county: [null, Validators.required],
      phoneNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(9), Validators.maxLength(14)])
      ],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      description: [null, Validators.required],
      itemvalue: [null],
      date: [null, Validators.required],
      type: [null, Validators.required],
      address: [null, Validators.required],
    });
  }
  onSubmit() {
    alert('Item posted! Relevant information will be availed');
    this.itemCol.add(this.secondFormGroup.value);
    this.userCol.add(this.firstFormGroup.value)

  }
}

interface Type {
  name: string;
  desc: string;
}