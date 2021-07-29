import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ListaAlojamientosComponent } from './Pages/lista-alojamientos/lista-alojamientos.component';
import { ListaExperienciasComponent } from './Pages/lista-experiencias/lista-experiencias.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { LoginGuard } from './guards/login.guard';
import { AlojamientoComponent } from './Pages/alojamiento/alojamiento.component';
import { ExperienciaComponent } from './Pages/experiencia/experiencia.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { FormularioAlojamientoComponent } from './Pages/formulario-alojamiento/formulario-alojamiento.component';
import { FormularioExperienciaComponent } from './Pages/fomulario-experiencia/fomulario-experiencia.component';



const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent },
    {path: 'alojamientos', component: ListaAlojamientosComponent},
    {path: 'alojamiento/:id', component: AlojamientoComponent},
    {path: 'experiencias', component: ListaExperienciasComponent},
    {path: 'experiencia/:id', component: ExperienciaComponent},
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},
    {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
    {path: 'formulario-alojamiento', component: FormularioAlojamientoComponent,children:[{path: ':id', component: FormularioAlojamientoComponent}], canActivate: [AuthGuard]},
    {path: 'formulario-experiencia', component: FormularioExperienciaComponent,children:[{path: ':id', component: FormularioExperienciaComponent}], canActivate: [AuthGuard]},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
