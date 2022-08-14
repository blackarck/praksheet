import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincmpComponent } from './logincmp/logincmp.component';
import { RegisterComponent } from './register/register.component';
import { RegpasscmpComponent } from './regpasscmp/regpasscmp.component';
import { UserdtlcmpComponent } from './userdtlcmp/userdtlcmp.component';
import { SuggmaincmpComponent } from './suggmaincmp/suggmaincmp.component';

const routes: Routes = [
  { path: 'loginscr', component: LogincmpComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'regpass', component: RegpasscmpComponent },
  { path: 'userdtl', component: UserdtlcmpComponent },
  { path: 'suggestion', component: SuggmaincmpComponent },
  { path: '', redirectTo: '/loginscr', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
