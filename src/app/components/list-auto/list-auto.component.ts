import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutoService } from '../../services/auto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


import { Auto } from '../../model/auto';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableExporterModule } from 'mat-table-exporter';
import  jsPDF  from 'jspdf';
import autoTable from 'jspdf-autotable'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-auto',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule,
    MatInputModule,
    MatTableExporterModule,
    CommonModule
  ],
  templateUrl: './list-auto.component.html',
  styleUrl: './list-auto.component.css'
})
export class ListAutoComponent implements OnInit {
  constructor(
    private autoService: AutoService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) {}

    [x: string]: any;

  displayedColumns: string[] = ['id', 'brand', 'price', 'actions']

  dataSource = new MatTableDataSource<Auto>()
  allData: Auto[] = []

  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator

  ngOnInit(): void {
    this.getAutos()
  }
  getAutos() {
    this.autoService.getAutos().subscribe((data: Auto[]) => {
      this.dataSource = new MatTableDataSource(data)
      this.allData = data
      this.dataSource.paginator = this.paginator
    })
  }
  filterAutoByBrand(brand: any) {
    if (brand.length === 0)
      {return this.getAutos()}

      this.autoService.getAutos().subscribe((resp: any) => {
      this.processAutoResponse(resp, brand)
    })
  }

  processAutoResponse(resp: any, brand: string) {
    const datAuto: Auto[] = []

    let listAuto = resp
    console.log("resp.."+ resp)

    listAuto.forEach((element: Auto) => {
      if (element.brand.startsWith(brand))
      {datAuto.push(element)}

    });

      //set the datasource
  this.dataSource = new MatTableDataSource<Auto>(datAuto);
  this.dataSource.paginator = this.paginator;
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

showDialog(id: number): void {
  this.dialog
    .open(DialogComponent, {
      data: "¿Deseas eliminar?"
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(id)
      }
    })
}

downloadPdf() {
  const doc = new jsPDF()
  autoTable(doc, {html: "#hidden_table"})
  doc.save("auto.pdf")

}
}
