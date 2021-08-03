import { Component, OnInit } from '@angular/core';
import { faHome, faHotel, faMosque } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
//Iconos
  faHome = faHome;
  faHotel = faHotel;
  faMosque = faMosque;
  constructor() { }

  ngOnInit(): void {
  }

}
