import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ActivatedRoute, Router } from '@angular/router';
import { AutoService } from '../../services/auto.service';
import { Auto } from '../../model/auto';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-auto',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-auto.component.html',
  styleUrl: './add-auto.component.css'
})
export class AddAutoComponent implements OnInit {
  public myForm!: FormGroup
  public _id: number = 0

  constructor(
    private fb: FormBuilder,
    private autoService: AutoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reactiveForm()
  }

  reactiveForm() {
    this.myForm = this.fb.group ({
      id: [''],
      brand: ['', Validators.required],
      price:  ['', Validators.required]
    })
    
    this._id = this.activatedRoute.snapshot.params['id']

    if (this._id != 0 && this._id != undefined) {
      this.autoService.getAutosById(this._id).subscribe((data: Auto) =>{
        this.myForm.get('brand')!.setValue(data.brand)
        this.myForm.get('price')!.setValue(data.price)
      } )
    }
  }

  addAuto() {
    const auto: Auto = {
      id: 0,
      brand: this.myForm.get('brand')!.value,
      price: this.myForm.get('price')!.value
    }
    if (this._id == 0 || this._id == undefined) {
      this.autoService.saveAuto(auto).subscribe({
        next: (data) => {
          console.log("ingresando registro...")
          this.snackBar.open('Auto creado correctamento', '', {
            duration: 3000
          })
        //  this.router.navigate(['/listAuto'])
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else
    {
      this.autoService.updateAuto(auto, this._id).subscribe({
        next: (date) => {
          this.snackBar.open('Auto modificado correctamente', '', {
            duration: 3000
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
