import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ArrangeDietComponent } from './components/arrange-diet/arrange-diet.component';
import { RecommendedDietComponent } from './components/recommended-diet/recommended-diet.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CalculatorBmiComponent } from './components/calculator-bmi/calculator-bmi.component';
import { UserMealsComponent } from './components/user-meals/user-meals.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DetailsDietComponent } from './components/details-diet/details-diet.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';

// Services
import { AuthorizeUserService } from './services/autorize-user.service';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
       path: 'stworz-uzytkownika',
       component: RegisterUserComponent,
    },
    {
       path: 'ustawienia-konta',
       component: UserDetailsComponent,
    },
    {
       path: 'main',
       component: MainComponent,
    },
    {
        path: 'stworz-diete',
        component: ArrangeDietComponent,
    },
    {
        path: 'rekomendowane-diety',
        component: RecommendedDietComponent,
    },
    {
        path: 'szczegoly-diety/:diet',
        component: DetailsDietComponent,
    },
    {
        path: 'lista-produktow',
        component: ProductsListComponent,
    },
    {
        path: 'posilki',
        component: UserMealsComponent,
    },
    {
        path: 'dodaj-posilek',
        component: AddMealComponent,
    },
    {
        path: 'kalkulator-bmi',
        component: CalculatorBmiComponent,
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
