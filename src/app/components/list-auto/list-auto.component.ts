import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutoService } from '../../services/auto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


import { Auto } from '../../model/auto';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-auto',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './list-auto.component.html',
  styleUrl: './list-auto.component.css'
})
export class ListAutoComponent implements OnInit {
  constructor(
    private autoService: AutoService,
    private snackBar: MatSnackBar,
    private router: Router) {}

    [x: string]: any;

  displayedColumns: string[] = ['id', 'brand', 'price', 'actions']

  dataSource = new MatTableDataSource<Auto>()



  ngOnInit(): void {
    this.getAutos()
  }
  getAutos() {
    this.autoService.getAutos().subscribe((data: Auto[]) => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  edit(
    id: number,
    brand: string,
    price: number
  ) {
    console.log('Editando ...')

  }


  delete(
    id: any
  ) {
    this.autoService.deleteAuto(id).subscribe({
    next: (data) => {
      console.log("eliminando registro..." + id)
      this.snackBar.open('Auto eliminado correctamento', '', {
        duration: 3000
      })
      this.getAutos()
      this.router.navigate(['/listauto'])

    },
    error: (err) => {
      console.log(err)
    },
  })

}

}
