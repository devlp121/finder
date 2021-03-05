import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewsComponent } from './views/views.component';

const routes: Routes = [
  { path: 'views', component: ViewsComponent },
  { path: '', redirectTo: '/views', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'add', component: AddItemComponent },
  { path: 'item', component: ItemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nav', component: NavigationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
