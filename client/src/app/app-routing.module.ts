import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
