import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { MainComponent } from './components/main/main.component';
// import { ArrangeDietComponent } from './components/arrange-diet/arrange-diet.component';
// import { RecommendedDietComponent } from './components/recommended-diet/recommended-diet.component';
// import { ProductsListComponent } from './components/products-list/products-list.component';
// import { CalculatorBmiComponent } from './components/calculator-bmi/calculator-bmi.component';
// import { UserMealsComponent } from './components/user-meals/user-meals.component';
// import { RegisterUserComponent } from './components/register-user/register-user.component';
// import { UserDetailsComponent } from './components/user-details/user-details.component';
// import { DetailsDietComponent } from './components/details-diet/details-diet.component';
// import { AddMealComponent } from './components/add-meal/add-meal.component';
// import { MealDetailsComponent } from './components/meal-details/meal-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'stworz-uzytkownika',
  //   component: RegisterUserComponent,
  // },
  // {
  //   path: 'ustawienia-konta',
  //   component: UserDetailsComponent,
  // },
  // {
  //   path: 'main',
  //   component: MainComponent,
  // },
  // {
  //   path: 'stworz-diete',
  //   component: ArrangeDietComponent,
  // },
  // {
  //   path: 'rekomendowane-diety',
  //   component: RecommendedDietComponent,
  // },
  // {
  //   path: 'szczegoly-diety/:dietName',
  //   component: DetailsDietComponent,
  // },
  // {
  //   path: 'lista-produktow',
  //   component: ProductsListComponent,
  // },
  // {
  //   path: 'posilki',
  //   component: UserMealsComponent,
  // },
  // {
  //   path: 'szczegoly-posilku/:mealId',
  //   component: MealDetailsComponent,
  // },
  // {
  //   path: 'dodaj-posilek',
  //   component: AddMealComponent,
  // },
  // {
  //   path: 'kalkulator-bmi',
  //   component: CalculatorBmiComponent,
  // },
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
