import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ArrangeDietComponent } from './components/arrange-diet/arrange-diet.component';
import { RecommendedDietComponent } from './components/recommended-diet/recommended-diet.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { DropdownNavigatorComponent } from './components/dropdown-navigator/dropdown-navigator.component';
import { CalculatorBmiComponent } from './components/calculator-bmi/calculator-bmi.component';
import { UserMealsComponent } from './components/user-meals/user-meals.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

import { AuthorizeUserService } from './services/autorize-user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ArrangeDietComponent,
    RecommendedDietComponent,
    ProductsListComponent,
    DropdownNavigatorComponent,
    CalculatorBmiComponent,
    UserMealsComponent,
    RegisterUserComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
      AuthorizeUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
