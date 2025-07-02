import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegistoProductoComponent } from './pages/registo-producto/registo-producto.component';


export const routes: Routes = [
    
    {path:'',component: LoginComponent},
    {path:'registro',component: RegistroComponent},
    {path:'homepage',component: HomePageComponent},
    {path:'registoproducto',component: RegistoProductoComponent}
];
