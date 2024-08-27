import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {UpperHeaderComponent} from './components/upper-header/upper-header.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {DownFooterComponent} from './components/down-footer/down-footer.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { CategoryListComponent } from './components/category-list copy/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

import { AccueilComponent } from './accueil/accueil.component';
import { DetailComponent } from './detail/detail.component';
import { PersoComponent } from './perso/perso.component';
import { ContacteznousComponent } from './contacteznous/contacteznous.component';
import { BlogComponent } from './blog/blog.component';
import { AproposComponent } from './apropos/apropos.component';
import { CartComponent } from './cart/cart.component';
import { SalonComponent } from './salon/salon.component';
import { BureauComponent } from './bureau/bureau.component';
import { PromotionComponent } from './promotion/promotion.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommandeListComponent } from './commande-list/commande-list.component'; 
import { NotAuthorizedComponent } from './services/notAuthorizedComponent';

// Import the NgxPaginationModule


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    UpperHeaderComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    ProductListComponent,
    ProductFormComponent,
    DownFooterComponent,
    AccueilComponent,
    DetailComponent,
    PersoComponent,
    ContacteznousComponent,
    BlogComponent,
    AproposComponent,
    CartComponent,
    SalonComponent,
    BureauComponent,
    PromotionComponent,
    CategoryListComponent,
    CategoryFormComponent,
    CheckoutComponent,
    CommandeListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule // Add NgxPaginationModule to the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
