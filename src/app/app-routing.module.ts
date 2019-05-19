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
       canActivate: [AuthorizeUserService]
    },
    {
        path: 'stworz-diete',
        component: ArrangeDietComponent,
        canActivate: [AuthorizeUserService]
    },
    {
        path: 'rekomendowane-diety',
        component: RecommendedDietComponent,
        canActivate: [AuthorizeUserService]
    },
    {
        path: 'szczegoly-diety/:diet',
        component: DetailsDietComponent,
        canActivate: [AuthorizeUserService]
    },
    {
        path: 'lista-produktow',
        component: ProductsListComponent,
        canActivate: [AuthorizeUserService]
    },
    {
        path: 'posilki',
        component: UserMealsComponent,
        canActivate: [AuthorizeUserService]
    },
    {
        path: 'kalkulator-bmi',
        component: CalculatorBmiComponent,
        canActivate: [AuthorizeUserService]
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
