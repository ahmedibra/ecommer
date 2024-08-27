import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailComponent } from './detail/detail.component';
import { PersoComponent } from './perso/perso.component';
import { ContacteznousComponent } from './contacteznous/contacteznous.component';
import { BlogComponent } from './blog/blog.component';
import { AproposComponent } from './apropos/apropos.component';
import { CartComponent } from './cart/cart.component';
import { SalonComponent } from './salon/salon.component';
import { BureauComponent } from './bureau/bureau.component';
import { CategoryListComponent } from './components/category-list copy/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CheckoutComponent } from './checkout/checkout.component'; 
import { CommandeListComponent } from './commande-list/commande-list.component'; 
import { AuthGuard } from './services/authGuard';
import { NotAuthorizedComponent } from './services/notAuthorizedComponent';

const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'landing', component: AccueilComponent},
  {path: 'home/:query', component: AccueilComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'product',component: ProductListComponent,canActivate: [AuthGuard]},
  {path: 'product/create',component: ProductFormComponent,canActivate: [AuthGuard] },
  {path: 'product/edit/:id',component: ProductFormComponent,canActivate: [AuthGuard]},
  {path: 'product/detail/:id',component: DetailComponent,canActivate: [AuthGuard]},
  {path: 'perso', component: PersoComponent},
  {path: 'contact', component: ContacteznousComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'apropos', component: AproposComponent},
  {path: 'cart', component: CartComponent},
  {path: 'salon', component: SalonComponent},
  {path: 'page/:id', component: BureauComponent},
  {path: 'checkout', component: CheckoutComponent},

  {path: 'category',component: CategoryListComponent,canActivate: [AuthGuard]},
  {path: 'category/create',component: CategoryFormComponent,canActivate: [AuthGuard] },
  {path: 'category/edit/:id',component: CategoryFormComponent,canActivate: [AuthGuard]},
  {path: 'commande-list',component: CommandeListComponent,canActivate: [AuthGuard]},
  { path: 'not-authorized', component: NotAuthorizedComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
