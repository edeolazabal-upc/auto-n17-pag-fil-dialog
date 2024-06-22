import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListAutoComponent } from './components/list-auto/list-auto.component';
import { AddAutoComponent } from './components/add-auto/add-auto.component';
import { HttpClientModule } from '@angular/common/http';
import { AutoService } from './services/auto.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, ListAutoComponent, AddAutoComponent, HttpClientModule],
    providers: [AutoService]

})
export class AppComponent {
  title = 'auto-app';

  constructor() {
    this.obtener_session_storage()
   // this.grabar_session_storage()
  }

  grabar_session_storage() {
    let rol: string = 'manager'
    let persona = {
      nombre: 'Juan',
      edad: 25,
      coord: {
        lat: 10,
        long: -11
      }
    }

    sessionStorage.setItem('rol', rol)
    sessionStorage.setItem('persona', JSON.stringify(persona))
  }

  obtener_session_storage() {
    let rol = sessionStorage.getItem('rol')
    let persona = sessionStorage.getItem('persona')

    console.log("nombre:", rol)
    console.log("persona:", persona)
  }
}
