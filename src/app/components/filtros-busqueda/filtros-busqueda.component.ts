import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtros-busqueda',
  templateUrl: './filtros-busqueda.component.html',
  styleUrls: ['./filtros-busqueda.component.css']
})
export class FiltrosBusquedaComponent implements OnInit {


  @Output() filtrado = new EventEmitter<any>();
  public filterForm: FormGroup;

  filtroPanelOpenState = false
  filtros: string[] = ['Playa', 'Montaña', 'Ciudad', 'Piscina'];
  filtros2: string[] = ['Jardin', 'Naturaleza', 'Playa', 'Tematico', 'Bosque', 'Atracciones'];
  ruta: string;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

     this.filterForm = this.fb.group({
        filtros: new FormControl('')
    });

    this.ruta = this.router.url;
  }
  enviar(){
   this.filtrado.emit(this.filterForm.value.filtros);
    
  }
}
