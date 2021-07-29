import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Rutas
import {APP_ROUTING} from './app.routes';

// Servicios
import { AlojamientosService } from './servicios/alojamientos.service';
// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/Estructura/navbar/navbar.component';
import { HomeComponent } from './Pages/home/home.component';
import { CabeceraComponent } from './components/Estructura/cabecera/cabecera/cabecera.component';
import { FooterComponent } from './components/Estructura/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { FormularioBusquedaComponent } from './components/formulario-busqueda/formulario-busqueda.component';
import { AlojamientoTarjetaComponent } from './components/alojamiento-tarjeta/alojamiento-tarjeta.component';
import { ListaAlojamientosComponent } from './Pages/lista-alojamientos/lista-alojamientos.component';
import { ListaExperienciasComponent } from './Pages/lista-experiencias/lista-experiencias.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { ComentarioTarjetaComponent } from './components/comentario-tarjeta/comentario-tarjeta.component';
import { ExperienciaComponent } from './Pages/experiencia/experiencia.component';
import { AlojamientoComponent } from './Pages/alojamiento/alojamiento.component';
import { HabitacionTarjetaComponent } from './components/habitacion-tarjeta/habitacion-tarjeta.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';

//Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FiltrosBusquedaComponent } from './components/filtros-busqueda/filtros-busqueda.component'
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { UsuarioListaComponent } from './components/usuario-lista/usuario-lista.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { FormularioAlojamientoComponent } from './Pages/formulario-alojamiento/formulario-alojamiento.component';
import {ImageUploadModule} from 'angular2-image-upload';

//Angular material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormularioExperienciaComponent } from './Pages/fomulario-experiencia/fomulario-experiencia.component';
import {MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CabeceraComponent,
    AlojamientoTarjetaComponent,
    CarouselComponent,
    SortByPipe,
    ListaAlojamientosComponent,
    FormularioBusquedaComponent,
    FiltrosBusquedaComponent,
    ListaExperienciasComponent,
    LoginComponent,
    RegistroComponent,
    ExperienciaComponent,
    AlojamientoComponent,
    ComentarioTarjetaComponent,
    HabitacionTarjetaComponent,
    PerfilComponent,
    UsuarioListaComponent,
    FormularioAlojamientoComponent,
    FormularioExperienciaComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatAutocompleteModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    ImageUploadModule.forRoot(),
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    AlojamientosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
