import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isButtonDisabled: boolean = false
  isButtonVisible: boolean = true

  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('rol') 
    if (sessionData) {
      this.isButtonDisabled = sessionData === 'manager'
      this.isButtonVisible = sessionData !== 'manager'
    }  
  }

}
